import { error } from './notifications';

export const  convertToHours = (milliSeconds) => {
  const minutes = Math.ceil(milliSeconds / 1000) / 60
  const hours = Math.trunc(minutes / 60)
  const remainingMinutes = Math.ceil(minutes % 60)
  return `${hours} 時間 ${remainingMinutes} 分`
}

export const convertToMinutes = (milliSeconds) => {
  const minutes = Math.floor(milliSeconds / 60000)
  const seconds = ((milliSeconds % 60000) / 1000).toFixed(0)
  return `${minutes} 分 ${seconds} 秒`
}

export const handleAjaxError = (err) => {
  error(err.message)
  console.error(err);
}
