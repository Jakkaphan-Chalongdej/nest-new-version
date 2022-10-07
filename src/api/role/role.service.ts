import { CrudService } from '@Base/crud.service';
import { RoleEntity } from '@Database/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class RoleService extends CrudService<RoleEntity> {
  protected readonly repository: Repository<RoleEntity>;
  constructor(private dataSource: DataSource) {
    super();
    this.repository = this.dataSource.getRepository(RoleEntity);
  }
}
