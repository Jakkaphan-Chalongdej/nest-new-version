import { CrudService } from '@Base/crud.service';
import { UserEntity } from '@Database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  protected readonly repository: Repository<UserEntity>;
  constructor(private dataSource: DataSource) {
    super();
    this.repository = this.dataSource.getRepository(UserEntity);
  }
}
