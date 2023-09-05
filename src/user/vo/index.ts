type UserInfo = {
  id: number;
  username: string;
  nickname?: string;
  email: string;
  isAdmin: boolean;
  isFrozen: boolean;
  roles: string[];
  permissions: string[];
};

/** 用户登陆成功后的返回结果 */
export class UserLoginVo {
  userInfo: UserInfo;
  accessToken: string;
  refreshToken: string;
}
