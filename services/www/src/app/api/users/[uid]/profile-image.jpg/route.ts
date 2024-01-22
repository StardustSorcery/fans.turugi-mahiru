import strapi from "@/app/_libs/strapi";
import { auth } from "@/utils/firebaseAdmin/auth";
import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import sharp from "sharp";
import axios from "axios";
import { StrapiMedia, StrapiResponseData, UserProfile } from "@/types/strapi";

export async function GET(
  req: NextRequest,
  {
    params: {
      uid,
    },
  }: {
    params: {
      uid: string;
    };
  },
): Promise<NextResponse> {
  return (async () => {
    const profileImage: Buffer | null =
      await strapi
        .find<StrapiResponseData<UserProfile>[]>(
          'user-profiles',
          {
            populate: '*',
            filters: {
              uid: {
                $eq: uid,
              },
            },
          },
        )
        .then(resp => {
          const record = resp.data[0];
          const profileImageRecord = record.attributes.profileImage.data;
          if(!record || !profileImageRecord) return null;

          // get binary
          return axios
            .request<ArrayBuffer>({
              method: 'get',
              baseURL: strapi.options.url,
              url: profileImageRecord.attributes.url,
              responseType: 'arraybuffer',
            })
            .then(resp => {
              return Buffer.from(resp.data);
            });
        });

    const res = new NextResponse(profileImage);
    res.headers.set('Content-Type', 'image/jpg');
    return res;
  })()
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}

export async function POST(
  req: NextRequest,
  {
    params: {
      uid,
    },
  }: {
    params: {
      uid: string;
    };
  },
): Promise<NextResponse> {
  return (async () => {
    const [ tokenType, idToken ] = (req.headers.get('Authorization') || '').split(' ');
    if(tokenType !== 'Bearer' || idToken.trim() === '') {
      return NextResponse.json({}, { status: 401 });
    }

    const decodedToken =
      await auth
        .verifyIdToken(idToken)
        .catch(err => {
          if(
            [
              'auth/id-token-expired',
              'auth/id-token-revoked',
              'auth/invalid-id-token',
            ].includes(err?.code)
            && err instanceof Error
          ) {
            const error = new Error(err.message);
            error.name = '__unauthorized__';
            throw error;
          }

          throw err;
        });

    if(uid !== decodedToken.uid) {
      const error = new Error('no access');
      error.name = '__forbidden__';
      throw error;
    }

    // Convert photo
    const reqFormData = await req.formData();
    const photo = reqFormData.get('photo');

    if(!photo || typeof photo === 'string') {
      return NextResponse.json({}, { status: 400 });
    }

    const photoArrayBuffer = await photo.arrayBuffer();

    const convertedPhotoBuffer =
      await sharp(Buffer.from(photoArrayBuffer))
        .resize({
          width: 256,
          height: 256,
          fit: 'cover',
        })
        .jpeg({
          quality: 80,
        })
        .toBuffer();

    // (Create if not exist and) get id of UserProfile record
    const {
      userProfileRecordId,
      profileImageFileId,
    }: {
      userProfileRecordId: number;
      profileImageFileId: number | null;
    } = await strapi
      .find<StrapiResponseData<UserProfile>[]>(
        'user-profiles',
        {
          populate: '*',
          filters: {
            uid: {
              $eq: uid,
            },
          },
        }
      )
      .then(resp => {
        const record = resp.data[0];
        if(record) {
          const profileImageRecord = record.attributes.profileImage.data;

          return {
            userProfileRecordId: record.id,
            profileImageFileId: profileImageRecord ? profileImageRecord.id : null,
          };
        }

        // create
        return strapi
          .create<StrapiResponseData<UserProfile>>(
            'user-profiles',
            {
              uid,
            }
          )
          .then(resp => {
            return {
              userProfileRecordId: resp.data.id,
              profileImageFileId: null,
            };
          });
      });

    // Upload photo
    const formData = new FormData();
    formData.append('files', convertedPhotoBuffer, `users_${uid}_profile-image.jpg`);
    formData.append('ref', 'api::user-profile.user-profile');
    formData.append('refId', userProfileRecordId);
    formData.append('field', 'profileImage');

    const newProfileImageRecordData =
      await strapi
        .request<StrapiMedia[]>(
          'post',
          '/upload',
          {
            data: formData,
            headers: {
              ...formData.getHeaders(),
            },
          }
        )
        .then(result => {
          return result[0];
        });

    // Delete if old photo exists
    if(profileImageFileId) {
      await strapi
        .request(
          'delete',
          `/upload/files/${profileImageFileId}`
        );
    }

    return NextResponse.json({
      hash: newProfileImageRecordData.hash.split('_').at(-1),
    });
  })()
    .catch(err => {
      if(err instanceof Error) {
        switch(err.name) {
          default: break;
          case '__unauthorized__': {
            return NextResponse.json({}, { status: 401 });
          }
          case '__forbidden__': {
            return NextResponse.json({}, { status: 403 });
          }
        }
      }

      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
