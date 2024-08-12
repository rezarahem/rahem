import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './actions/auth/auth';

import { DEAFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/routes';

export const middleware = async (req: NextRequest) => {
  // return await updateSession(req);
  try {
    await updateSession(req);
    const { pathname } = req.nextUrl;
    const session = await getSession();
    const isLogin = session && session?.user ? true : false;
    const isAuthRoutes = authRoutes.includes(pathname);
    const isPublicRoutes = publicRoutes.includes(pathname);

    if (isAuthRoutes) {
      if (isLogin) {
        return NextResponse.redirect(new URL(DEAFAULT_LOGIN_REDIRECT, req.url));
      }

      return;
    }

    if (!isLogin && !isPublicRoutes)
      return NextResponse.redirect(new URL('/login', req.url));

    // if (isAdminRoutes && String(req.auth?.user.role) !== 'ADMIN')
    //   return Response.redirect(new URL('/user', nextUrl));

    return NextResponse.next();
  } catch (error) {
    // console.error('Middleware error:', error);
    return NextResponse.error();
  }
};

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
