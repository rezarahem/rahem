'use client';

import { CheckSessionInDb } from '@/actions/auth/check-session-on-db';
import { useEffect, useRef } from 'react';

const CheckUserSession = () => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      checkDb();
    }
  }, []);

  const checkDb = async () => {
    await CheckSessionInDb();
  };
  return <div></div>;
};

export default CheckUserSession;
