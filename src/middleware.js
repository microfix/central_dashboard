import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Fix /pid bad gateway by routing through the working PID app domain.
  if (pathname === '/pid' || pathname.startsWith('/pid/')) {
    const target = `https://pid.appfix.org${pathname}${search || ''}`;
    return NextResponse.redirect(target, 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
