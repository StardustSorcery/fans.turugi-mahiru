import strapi from "@/app/api/_libs/strapi";
import { auth } from "@/utils/firebaseAdmin/auth";
import { NextRequest, NextResponse } from "next/server";
import FormData from "form-data";
import sharp from "sharp";

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

    const formData = new FormData();
    formData.append('files', convertedPhotoBuffer, `users_${uid}_profile-image.jpg`);

    await strapi
      .request(
        'post',
        '/upload',
        {
          data: formData,
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

    return NextResponse.json({});
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
