import { Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ENUMTypeColumnEntity } from './enum/database.enum';
import { SERIALIZE_GROUP } from './enum/serialization-group.enum';

export class ExtendedEntity extends BaseEntity {
  public id?: number;

  @Column({ type: 'bool', default: false, name: 'is_delete' })
  @Expose({
    groups: [],
  })
  public isDelete: boolean;

  @CreateDateColumn({
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    name: 'created_at',
  })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_BASE, SERIALIZE_GROUP.GROUP_ALL_BASE],
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    name: 'updated_at',
  })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_BASE, SERIALIZE_GROUP.GROUP_ALL_BASE],
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    name: 'deleted_at',
    nullable: true,
  })
  @Expose({
    groups: [],
  })
  deletedAt: Date;
}
