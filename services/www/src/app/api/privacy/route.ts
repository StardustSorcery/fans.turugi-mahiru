import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  Privacy,
  StrapiResponseData,
} from '@/types/strapi';

export function GET(req: NextRequest): Promise<NextResponse> {
  return strapi.find<StrapiResponseData<Privacy>>('privacy').then((resp) => {
    return NextResponse.json(resp);
  }).catch(err => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  });
}
