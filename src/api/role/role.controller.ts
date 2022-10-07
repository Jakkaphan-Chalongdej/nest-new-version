import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaginationQueryString } from '@Shared/dto/paginationQueryString.dto';
import { plainToInstance } from 'class-transformer';
import { paginateResponse } from '@Shared/response/response';
import { RoleEntity } from '@Database/entities/role.entity';

@Controller('role')
@ApiTags('role')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  async findAll(@Query() qs: PaginationQueryString) {
    const [result, total] = await this.roleService.findAndCount({
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
    return await this.roleService.findOne({ where: { id: id } });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.roleService.patch(id, updateRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.roleService.softDelete({ id: id });
  }
}
