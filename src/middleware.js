import { NextResponse } from 'next/server';

// (Intentionally minimal)
// We no longer redirect pid -> da here. pid.appfix.org is used by PID Compare.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
