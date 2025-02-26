'use server';

import { auth, signIn, signOut } from '@/lib/auth/auth';
import { LOGIN_HOME, PUBLIC_HOME } from '@/lib/routes';

export async function signInAction() {
  await signIn(undefined, { redirectTo: LOGIN_HOME });
}

export async function signOutAction() {
  await signOut({ redirectTo: PUBLIC_HOME });
}

export async function getSessionAction() {
  const session = await auth();
  return session;
}
