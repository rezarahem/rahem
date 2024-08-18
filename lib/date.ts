import 'server-only';

export const utcDate = (): Date => {
  return new Date(Date.now());
  // const localTime = new Date(utcTime.getTime() + 210 * 60000);
};

export const utcUnix = () => {
  return Date.now().toString();
};

export const nowDate = () => {
  return new Date(Date.now());
};

export const hasTwoMinutesPassed = (
  dbTimestamp: string,
  currentTimestamp: string,
) => {
  // 120000ms = 120s
  return +currentTimestamp - +dbTimestamp < 120000;
};
