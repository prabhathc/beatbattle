import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('Middleware triggered for:', req.nextUrl.pathname);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const { data: session } = await supabase.auth.getSession();
  console.log('Session data in middleware:', session);

  // Protect authenticated routes
  if (req.nextUrl.pathname.startsWith('/my-battles') ||
      req.nextUrl.pathname.startsWith('/profile') ||
      req.nextUrl.pathname.startsWith('/settings')) {
    if (!session) {
      console.log('No session, redirecting to /');
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';
      redirectUrl.searchParams.set('from', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Skip validation for homepage with ?from=callback
  if (req.nextUrl.pathname === '/' && req.nextUrl.searchParams.get('from') === 'callback') {
    console.log('Skipping session validation for callback redirect');
    return res;
  }

  return res;
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/callback).*)',
  ],
};
