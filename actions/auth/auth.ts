import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import 'server-only';

type UserDataType = {
  id: number;
  phoneNumber: string;
  userRole: 'ADMIN' | 'USER';
};

type UserSessionType = {
  id: number;
  userRole?: string;
  phoneNumber: string;
};

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login(userData: UserDataType): Promise<{
  success: boolean;
  errorMessage?: string;
}> {
  try {
    const { id, userRole, phoneNumber } = userData;

    const user: UserSessionType =
      userRole === 'ADMIN'
        ? {
            id,
            phoneNumber,
            userRole,
          }
        : {
            id,
            phoneNumber,
          };

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    cookies().set('session', session, {
      expires,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: 'خطایی رخ داد، مجددا تلاش کنید',
    };
  }
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession(): Promise<{
  user: UserSessionType;
  expires: string;
  // iat: number;
  // exp: number;
} | null> {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
