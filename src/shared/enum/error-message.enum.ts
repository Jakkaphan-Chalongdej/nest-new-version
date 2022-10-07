export enum ENUMErrorMessage {
  BAD_REQUEST = 'BAD_REQUEST',
  ALREADY_ADMIN = 'Already admin',
  // Type Notfound
  NOTFOUND = 'Not found',
  NOTFOUND_USERINFO = 'Not found user Info',
  NOTFOUND_ADMIN = 'Not found admin',
  NOTFOUND_MENU = 'Not found menu',

  NOTFOUND_USER = 'NOTFOUND_USER',
  ALREADY_USER = 'Already user',
}
export const ENUMErrorMessages = {
  CAN_NOT_ACCESS: {
    TH: 'ไม่สามารถเข้าถึงข้อมูลได้กรุณาติดต่อผู้ดูแลระบบ',
    EN: 'can not access data please contact admin',
  },
  TRY_LOGIN_AGAIN: {
    TH: 'กรุณาเข้าสู่ระบบใหม่อีกครั้ง',
    EN: 'Please try login again',
  },

  NOT_FOUND: { TH: 'ไม่พบข้อมูล', EN: 'Not found ' },
};
