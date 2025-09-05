import { NextRequest, NextResponse } from 'next/server';
import { TENANTS } from './lib/tenants';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Ignorar archivos estáticos, _next y /api
  if (
    PUBLIC_FILE.test(url.pathname) ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/assets')
  ) {
    return NextResponse.next();
  }

  // --- Subdominio: acme.midominio.com ---
  const host = req.headers.get('host') || '';
  const hostname = host.split(':')[0]; // quitar puerto
  const [subdomain] = hostname.split('.');

  const isLocal =
    hostname.startsWith('localhost') ||
    hostname.includes('127.0.0.1') ||
    /^\d+\.\d+\.\d+\.\d+$/.test(hostname);

  const subdomainIsTenant =
    !isLocal && subdomain && TENANTS.some((t) => t.slug === subdomain);

  // --- Ruta: /acme/... ---
  const firstSegment = url.pathname.split('/').filter(Boolean)[0];
  const pathIsTenant = TENANTS.some((t) => t.slug === firstSegment);

  // Subdominio válido → reescribe a /[tenant]/...
  if (subdomainIsTenant && !pathIsTenant) {
    url.pathname = `/${subdomain}${url.pathname}`;
    const res = NextResponse.rewrite(url);
    res.headers.set('x-tenant', subdomain);
    return res;
  }

  // Ya viene /[tenant]/... → propaga header
  if (pathIsTenant) {
    const res = NextResponse.next();
    res.headers.set('x-tenant', firstSegment);
    return res;
  }

  // No hay tenant → seguir normal (landing, 404, etc.)
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
