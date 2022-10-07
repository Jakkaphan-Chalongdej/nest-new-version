export interface IUserInfo {
  fullName: string;
  firstName: string;
  lastName: string;
  userCode?: string;
  role: string;
  permission?: any;
  image: any;
  line: string;
  phone: string;
  acceptCondition: boolean;
  newNotification: number;
}
export interface IRespLogin {
  userInfo: IUserInfo;
  accessToken: string;
  refreshToken: string;
}
