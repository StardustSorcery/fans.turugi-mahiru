import { NextRequest, NextResponse } from "next/server";
import * as Youtubei from "../../_libs/youtubei";
import axios from "axios";

export async function GET(req: NextRequest): Promise<NextResponse> {
  return (async () => {
    const searchParams = req.nextUrl.searchParams;
    const targetUrl = searchParams.get('url');

    if(!targetUrl) {
      return NextResponse.json({}, { status: 400 });
    }

    const youtubei = await Youtubei.init();

    const redirectedUrl = await axios
      .get(targetUrl)
      .then(result => {
        return `${result.request?.protocol}//${result.request?.host}${result.request?.path}`;
      });

    return await youtubei
      .resolveURL(redirectedUrl)
      .then(result => {
        return NextResponse.json(result);
      })
      .catch(err => {
        return NextResponse.json({}, { status: 400 });
      });
  })()
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    })
}
