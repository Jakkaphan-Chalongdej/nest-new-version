import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin', required: true })
  @IsString()
  password: string;
}
