import { JWT_TYPE } from '@Shared/enum/jwt.enum';

export interface IJwtPayload {
  id: number;
  role: string;
  type?: JWT_TYPE;
}
