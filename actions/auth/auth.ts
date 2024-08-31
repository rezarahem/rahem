import 'server-only';
import {
  SignJWT,
  jwtVerify,
  compactDecrypt,
  CompactEncrypt,
  importJWK,
} from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export type UserSessionType = {
  id: number;
  userName: string;
  phoneNumber: string;
};

const key = new TextEncoder().encode(process.env.SECRET_KEY);

const importKy = async () => {
  return await importJWK(
    {
      kty: process.env.ET,
      k: process.env.EK,
    },
    'A256GCM',
  );
};

export const sign = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key);
};

export const verify = async (
  input: string,
): Promise<{ data: string; expires: Date }> => {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload as { data: string; expires: Date };
};

export const encryptData = async (payload: string): Promise<string> => {
  const key = await importKy();
  const jwe = await new CompactEncrypt(new TextEncoder().encode(payload))
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .encrypt(key);
  return jwe.split('..')[1];
};
export const decryptData = async (encryptedData: string): Promise<any> => {
  const key = await importKy();
  const sult = process.env.ES;
  const jwe = `${sult}..${encryptedData}`;
  const { plaintext } = await compactDecrypt(jwe, key);
  const sessionData = new TextDecoder().decode(plaintext);
  return JSON.parse(sessionData);
};

export const updateSession = async (request: NextRequest) => {
  const reqSession = request.cookies.get('session')?.value;
  if (!reqSession) return;

  const verifiedSession = await verify(reqSession);

  verifiedSession.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await sign(verifiedSession),
    expires: verifiedSession.expires,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return res;
};

export const getSession = async (): Promise<{
  user: UserSessionType;
  expires: Date;
} | null> => {
  const session = cookies().get('session')?.value;
  if (!session) return null;

  const { data, expires } = await verify(session);

  return {
    user: await decryptData(data),
    expires,
  };
};

export const getSessionOnReq = async ({
  data,
  expires,
}: {
  data: string;
  expires: Date;
}): Promise<{
  user: UserSessionType;
  expires: Date;
}> => {
  return {
    user: await decryptData(data),
    expires,
  };
};

export const createSession = async (
  data: string,
  expires: Date,
): Promise<{
  encryptedData: string;
  session: string;
}> => {
  const encryptedData = await encryptData(data);
  const session = await sign({ data: encryptedData, expires });
  return {
    encryptedData,
    session,
  };
};
