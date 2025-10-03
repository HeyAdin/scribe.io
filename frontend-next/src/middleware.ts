import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes
const protectedRoutes = ['/blogs', 'profile'];
const publicRoutes = ['/signin', '/signup'];

export default async function middleware(req: NextRequest) {
  // 2. Get the current path
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix));
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get the tokens from the cookies
  // The cookies() function returns a Promise, so we must 'await' it.
  const cookieStore = await cookies();
  const Token = cookieStore.get('token')?.value;

  // For this example, we'll consider the user authenticated if both tokens exist.
  const isAuthenticated = Token;

  // 4. Redirect to /login if the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/signin', req.nextUrl.origin);
    loginUrl.searchParams.set('redirect_to', path); // Optional: redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  // 5. Redirect to /dashboard if the user is authenticated and trying to access a public route
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/blogs', req.nextUrl));
  }

  // 6. Allow the request to continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
