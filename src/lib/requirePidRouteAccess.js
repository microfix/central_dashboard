import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { hasPidAccess } from '@/lib/groups';

export async function requirePidRouteAccess() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { ok: false, status: 401 };
  }

  const groups = session?.user?.groups || [];
  if (!hasPidAccess(groups)) {
    return { ok: false, status: 403 };
  }

  return { ok: true, status: 200, session };
}
