export const getLocalDateForDb = (): Date => {
  const utcTime = new Date(Date.now());
  const localTime = new Date(utcTime.getTime() + 420 * 60000);
  return localTime;
};

export const nowTimestamp = () => {
  return Date.now();
};

export const nowDate = () => {
  return new Date(Date.now());
};

export const hasTwoMinutesPassed = (dbTimestamp: number, currentTimestamp: number) => {
  // 120000ms = 120s
  return currentTimestamp - dbTimestamp < 120000;
};
