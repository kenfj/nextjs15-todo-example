import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('user_id');

  if (!userId) {
    const newUserId = await generateUserId();

    // https://github.com/vercel/next.js/discussions/34822
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("user_id", newUserId, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  return NextResponse.next();
}

async function generateUserId() {
  return "1";   // guest user id is hardcoded to 1
}
