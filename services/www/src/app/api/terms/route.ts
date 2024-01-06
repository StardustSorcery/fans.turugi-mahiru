import { NextRequest, NextResponse } from 'next/server';
import strapi from '@/app/api/_libs/strapi';
import type {
  Terms,
  StrapiResponseData,
} from '@/types/strapi';

export function GET(req: NextRequest): Promise<NextResponse> {
  return strapi.find<StrapiResponseData<Terms>>('term').then((resp) => {
    return NextResponse.json(resp);
  }).catch(err => {
    console.error(err);
    return NextResponse.json({}, { status: 500 });
  });
}
