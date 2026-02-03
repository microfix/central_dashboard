import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import AppGrid from '@/components/AppGrid';
import { SignInButton, SignOutButton } from '@/components/AuthButtons';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="container">
      <div className="topbar">
        <div className="brand">
          <h1 className="title">Microfix Dashboard</h1>
          <p className="subtitle">Central adgang til interne tools (appfix.org)</p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {session?.user ? (
            <>
              <div className="small" style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {session.user.name || session.user.email || 'User'}
                </div>
                <div className="small">Logget ind</div>
              </div>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>

      <div className="hr" />

      {!session?.user ? (
        <div className="card">
          <h3>Login påkrævet</h3>
          <p>
            Log ind for at se de tools du har adgang til. (SSO via Authentik)
          </p>
        </div>
      ) : (
        <>
          <AppGrid session={session} />
          <div className="hr" />
          <div className="card">
            <h3>Admin</h3>
            <p>
              Brugerstyring og adgang styres i Authentik. Dashboardet viser kun apps du har adgang til.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link className="btn" href={process.env.AUTHENTIK_ADMIN_URL || 'https://auth.appfix.org/if/admin/'} target="_blank">
                Åbn Auth Admin
              </Link>
              <Link className="btn" href="https://coolify.io" target="_blank" style={{ opacity: 0.7 }}>
                (valgfrit) Coolify
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
