import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    console.log('Callback route triggered');
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (!code) {
      console.error('No code in URL');
      return NextResponse.redirect(new URL('/', requestUrl.origin));
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    console.log('Exchanging code for session...');
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(
        new URL(`/auth-error?message=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    console.log('Session exchanged successfully:', data);
    return NextResponse.redirect(
      new URL('/?from=callback', requestUrl.origin) // Add query param to indicate callback redirect
    );
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(
      new URL(`/auth-error?message=${encodeURIComponent('Authentication failed')}`, request.url)
    );
  }
}
