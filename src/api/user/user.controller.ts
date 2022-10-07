import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  SerializeOptions,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SERIALIZE_GROUP } from '@Database/common/enum/serialization-group.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleEntity } from '@Database/entities/role.entity';
import { PaginationQueryString } from '@Shared/dto/paginationQueryString.dto';
import { paginateResponse } from '@Shared/response/response';
import { plainToInstance } from 'class-transformer';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @SerializeOptions({ groups: [SERIALIZE_GROUP.GROUP_USER] })
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() qs: PaginationQueryString) {
    const [result, total] = await this.userService.findAndCount({
      skip: qs.getOffset(),
      take: qs.limit,
    });
    return paginateResponse(
      plainToInstance(RoleEntity, result),
      total,
      qs.limit,
      qs.page,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne({ where: { id: id } });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.patch(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.softDelete({ id: id });
  }
}
