import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/th';
// import { UnitType } from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.locale('th');

const timeZone = 'asia/Bangkok';
//พ.ศ.
export const getDateSerialNO = (format = 'DDMMYY'): string => {
  const _date = dayjs().add(543, 'year').tz(timeZone).format(format);
  return _date;
};

//ค.ศ.
export const getDateSerialNOG2 = (format = 'DDMMYY'): string => {
  const _date = dayjs().format(format);
  return _date;
};

export const zeroPad = (num: number, size: number) => {
  const s = '000000000' + num;
  return s.substr(s.length - size);
};

export const getDate = (timestamp: number, format = 'DD-MM-YYYY'): string => {
  let _data: number = timestamp;
  if (typeof timestamp === 'string') _data = parseInt(timestamp);
  const day = dayjs(_data).tz(timeZone).format(format);
  return day;
};

export const getDateTh = (timestamp: number, format = 'DD-MM-YYYY'): string => {
  let _data: number = timestamp;
  if (typeof timestamp === 'string') _data = parseInt(timestamp);
  const day = dayjs(_data).add(543).tz(timeZone).format(format);
  return day;
};

export const convertDateFilter = (
  startDate: string,
  endDate: string,
  option: dayjs.UnitType = 'day',
) => {
  const _startDate = dayjs(startDate.replace(/"/g, ''))
    .startOf(option)
    .toISOString();
  const _endDate = dayjs(endDate.replace(/"/g, '')).endOf(option).toISOString();
  return { startDate: _startDate, endDate: _endDate };
};
