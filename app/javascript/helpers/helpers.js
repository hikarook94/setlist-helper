import { error } from "./notifications";

export const convertToHours = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} 時間 ${remainingMinutes} 分`;
};

export const convertToHour = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / 60000);
  return Math.floor(minutes / 60);
};

export const convertToRemainingMinute = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / 60000);
  return minutes % 60;
};

export const convertToMinutes = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / 60000);
  const seconds = ((milliSeconds % 60000) / 1000).toFixed(0);
  return `${minutes} 分 ${seconds} 秒`;
};

export const convertToMilliSeconds = (hours, minutes) => {
  return (hours * 60 + minutes) * 60 * 1000;
};

export const handleAjaxError = (err) => {
  error(err.message);
  console.error(err);
};
