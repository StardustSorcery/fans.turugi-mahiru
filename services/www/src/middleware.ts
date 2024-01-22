import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    '/api/users/:uid/profile-image.jpg',
  ],
};

export function middleware(req: NextRequest) {
  const res = NextResponse
    .next({
      request: {
        headers: new Headers(req.headers),
      },
    });

  const pathname = req.nextUrl.pathname;

  // Set cache-control header on user's profile image
  if(new RegExp('^/api/users/.+/profile-image.jpg$').test(pathname)) {
    res.headers.set('Cache-Control', 'max-age=604800, must-revalidate');
  }

  return res;
}
