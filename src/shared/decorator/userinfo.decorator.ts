import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ENUMErrorMessage } from '@Shared/enum/error-message.enum';
import { ENUMUserType } from '@Shared/enum/user.enum';
import { IUserInfoDecorator } from '@Shared/interface/userinfo.interface';

export const UserInfo = createParamDecorator(
  (type: ENUMUserType = ENUMUserType.ADMIN, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userInfo: IUserInfoDecorator = {
      uuid: request.user.uuid,
      role: request.user?.role,
    };

    if (
      !userInfo ||
      (type !== ENUMUserType.ADMIN && type !== ENUMUserType.USER)
    )
      throw new UnauthorizedException(ENUMErrorMessage.NOTFOUND_USERINFO);
    return userInfo;
  },
);

export const RefreshTokenInfo = createParamDecorator(
  (type: ENUMUserType = ENUMUserType.ADMIN, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];

    const userInfo = {
      refreshToken: token,
      id: request.user.id,
    };

    if (request.user?.type !== 'refreshToken') {
      throw new UnauthorizedException();
    }
    return userInfo;
  },
);
