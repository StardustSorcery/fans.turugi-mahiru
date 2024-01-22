import { RankingUserVoting, StrapiResponseData } from "@/types/strapi";
import { auth } from "@/utils/firebaseAdmin/auth";
import { FirebaseError } from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import strapi from "../../../_libs/strapi";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return (async () => {
    const [ tokenType, idToken ] = (req.headers.get('Authorization') || '').split(' ');
    if(tokenType !== 'Bearer' || idToken.trim() === '') {
      return NextResponse.json({}, { status: 401 });
    }

    const decodedToken = await auth
      .verifyIdToken(idToken)
      .catch((err: FirebaseError) => {
        if(
          [
            'auth/id-token-expired',
            'auth/id-token-revoked',
            'auth/invalid-id-token',
          ].includes(err.code)
        ) {
          return null;
        }

        throw err;
      });
    if(!decodedToken) return NextResponse.json({}, { status: 401 });

    const record = await strapi
      .find<StrapiResponseData<RankingUserVoting>[]>(
        'ranking-user-votings',
        {
          filters: {
            uid: decodedToken.uid,
          },
          populate: [
            'videos',
            'videos.thumbnails',
            'videos.author',
          ],
          pagination: {
            page: 1,
            pageSize: 1,
            withCount: false,
          },
        }
      )
      .then(res => {
        return res.data[0] || null;
      });
    if(!record) return NextResponse.json({}, { status: 404 });

    return NextResponse.json(record);
  })()
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return (async () => {
    const [ tokenType, idToken ] = (req.headers.get('Authorization') || '').split(' ');
    if(tokenType !== 'Bearer' || idToken.trim() === '') {
      return NextResponse.json({}, { status: 401 });
    }

    const decodedToken = await auth
      .verifyIdToken(idToken)
      .catch((err: FirebaseError) => {
        if(
          [
            'auth/id-token-expired',
            'auth/id-token-revoked',
            'auth/invalid-id-token',
          ].includes(err.code)
        ) {
          return null;
        }

        throw err;
      });
    if(!decodedToken) return NextResponse.json({}, { status: 401 });
  
    const {
      videos,
    } = await req.json() as { videos: number[] };
    if(
      !videos
      || !Array.isArray(videos)
      || videos.some(v => typeof v !== 'number')
      || videos.length > 5
    ) {
      return NextResponse.json({}, { status: 400 });
    }

    const entryId =
      await strapi
        .find<StrapiResponseData<RankingUserVoting>[]>(
          'ranking-user-votings',
          {
            fields: [],
            filters: {
              uid: decodedToken.uid,
            },
            pagination: {
              page: 1,
              pageSize: 1,
              withCount: false,
            },
          }
        )
        .then(res => {
          return res.data[0]?.id || null;
        });

    const upsertedRecord = (async () => {
      if(!entryId) {
        return await strapi
          .create<StrapiResponseData<RankingUserVoting>>(
            'ranking-user-votings',
            {
              uid: decodedToken.uid,
              videos: {
                set: videos,
              }
            }
          )
          .then(res => {
            return res.data;
          });
      }
      else {
        return await strapi
          .update<StrapiResponseData<RankingUserVoting>>(
            'ranking-user-votings',
            entryId,
            {
              videos: {
                set: videos,
              },
            }
          )
          .then(res => {
            return res.data;
          })
      }
    })();

    return NextResponse.json(upsertedRecord);
  })()
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
