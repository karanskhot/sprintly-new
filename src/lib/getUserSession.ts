import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getUserSession = cache(async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  return userId;
});
