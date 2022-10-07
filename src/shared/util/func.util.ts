import { getDateSerialNO, zeroPad } from '@Shared/helper/date-helper';

export const isEmpty = (value: any): boolean => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  return false;
};

export const checkUpdate = (oldData: any[], newData: any[]) => {
  const oldArray = oldData.filter((val) => !newData.includes(val));
  const newArray = newData.filter((val) => !oldData.includes(val));
  const filerOldArray = oldData.filter((val) => oldArray.includes(val));
  return { newData: newArray, oldData: filerOldArray };
};

export function generateNumber(versionNumber: number) {
  const date = getDateSerialNO();
  const version = zeroPad(versionNumber, 4);
  const string = `C${date}-${version}`;
  return string;
}
