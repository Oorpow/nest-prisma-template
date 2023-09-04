type UserInfo = {
  username: string;
  nickname?: string;
  email: string;
  is_admin: boolean;
  is_frozen: boolean;
  roles: string[];
  permissions: string[];
};

export class UserLoginVo {
  userInfo: UserInfo;
}
