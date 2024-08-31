import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './actions/auth/auth';

import { DEAFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/routes';

export const middleware = async (req: NextRequest) => {
  // try {
  const res = await updateSession(req);

  const { pathname } = req.nextUrl;

  const session = await getSession();
  const isLogin = session && session?.user ? true : false;
  const isAuthRoutes = authRoutes.includes(pathname);
  const isPublicRoutes = publicRoutes.includes(pathname);

  if (isAuthRoutes) {
    if (isLogin) {
      return NextResponse.redirect(new URL(DEAFAULT_LOGIN_REDIRECT, req.url));
    }

    return res;
  }

  if (!isLogin && !isPublicRoutes)
    return NextResponse.redirect(new URL('/login', req.url));

  // if (isAdminRoutes && String(req.auth?.user.role) !== 'ADMIN')
  //   return Response.redirect(new URL('/user', nextUrl));

  return res;
  // return NextResponse.next();
  // } catch (error) {
  // console.error('Middleware error:', error);
  // return NextResponse.error();
  // }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // matcher: ['/', '/login', '/about-us'],
  // matcher: ['/((?!_next|api/).*)'],
  // matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

// import { NextRequest } from 'next/server';
// import { updateSession } from './actions/auth/auth';

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }
