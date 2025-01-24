import { cookies } from 'next/headers';

export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : undefined;
}

export async function getUserId(): Promise<number> {
  const userId = await getCookie('user_id');
  if (!userId) {
    throw new Error('User ID not found in cookies');
  }
  return Number(userId);
}
