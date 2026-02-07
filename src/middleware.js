import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';

  // Canonical host: pid.appfix.org skal bare lande på da.appfix.org
  if (host.startsWith('pid.appfix.org')) {
    const url = request.nextUrl.clone();
    url.hostname = 'da.appfix.org';
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
