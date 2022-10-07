import { UserService } from '@Api/user/user.service';
import { UserEntity } from '@Database/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ENUMErrorMessages } from '@Shared/enum/error-message.enum';
import { compareSync } from 'bcrypt';
import { DataSource } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .select(['user', 'user.password'])
      .leftJoinAndSelect('user.role', 'role')
      .where('user.isDelete = :isDelete', { isDelete: false })
      .andWhere('LOWER(user.username) = :username', {
        username: username,
      })
      .andWhere('user.isActive = :isActive', { isActive: true })
      .getOne();

    console.log(
      `🐛  ~ file: auth.service.ts ~ line 28 ~ AuthService ~ validateUser ~ user`,
      user,
    );

    if (!user) {
      throw new UnauthorizedException(ENUMErrorMessages.TRY_LOGIN_AGAIN);
    }
    if (user && compareSync(password, user.password)) {
      return user;
    } else {
      throw new UnauthorizedException(ENUMErrorMessages.TRY_LOGIN_AGAIN);
    }
  }

  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }
}
