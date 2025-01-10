import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const guestUserId = cookieStore.get('guest_user_id');

  if (!guestUserId) {
    const newGuestUserId = await generateGuestUserId();

    // https://github.com/vercel/next.js/discussions/34822
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("guest_user_id", newGuestUserId, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  return NextResponse.next();
}

async function generateGuestUserId() {
  return "1";   # guest user id is hardcoded to 1
}
