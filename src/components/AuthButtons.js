'use client';

import { signIn, signOut } from 'next-auth/react';

export function SignInButton() {
  return (
    <button className="btn primary" onClick={() => signIn('authentik')}>
      Log ind
    </button>
  );
}

export function SignOutButton() {
  return (
    <button className="btn" onClick={() => signOut({ callbackUrl: '/' })}>
      Log ud
    </button>
  );
}
