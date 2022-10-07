import { SERIALIZE_GROUP } from '@Database/common/enum/serialization-group.enum';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { IJwtPayload } from '@Shared/interface/jwt.interface';
import { JWT_TYPE } from '../shared/enum/jwt.enum';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.authService.validateUser(
      username.toLowerCase(),
      password,
    );
    const payload: IJwtPayload = {
      id: user.id,
      role: user?.role?.name,
    };
    const acToken = this.jwtService.sign({
      ...payload,
      type: JWT_TYPE.AC_TOKEN,
    });

    const _resp: any = {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user?.role?.name,
      username: user.username,
      accessToken: acToken,
    };
    return _resp;
  }

  @Post('register')
  @HttpCode(200)
  @SerializeOptions({ groups: [SERIALIZE_GROUP.GROUP_USER] })
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
