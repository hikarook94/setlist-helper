import { error } from "./notifications";

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;

export const convertToHours = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / MILLISECONDS_PER_MINUTE);
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  const remainingMinutes = minutes % MINUTES_PER_HOUR;
  return `${hours} 時間 ${remainingMinutes} 分`;
};

export const convertToHour = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / MILLISECONDS_PER_MINUTE);
  return Math.floor(minutes / MINUTES_PER_HOUR);
};

export const convertToRemainingMinute = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / MILLISECONDS_PER_MINUTE);
  return minutes % MINUTES_PER_HOUR;
};

export const convertToMinutes = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / MILLISECONDS_PER_MINUTE);
  const seconds = (
    (milliSeconds % MILLISECONDS_PER_MINUTE) /
    MILLISECONDS_PER_SECOND
  ).toFixed(0);
  return `${minutes} 分 ${seconds} 秒`;
};

export const convertToMilliSeconds = (hours, minutes) => {
  return (hours * MINUTES_PER_HOUR + minutes) * MILLISECONDS_PER_MINUTE;
};

export const handleAjaxError = (err) => {
  error(err.message);
  console.error(err);
};
