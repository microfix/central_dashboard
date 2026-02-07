import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/auth';
import { hasPidAccess } from '@/lib/groups';

export async function requirePidAccess(callbackUrl = '/pid') {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/api/auth/signin/keycloak?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  const groups = session?.user?.groups || [];
  const allowed = hasPidAccess(groups);

  return { session, allowed };
}
