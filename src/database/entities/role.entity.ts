import {
  DB_TABLE_NAME,
  ENUMTypeColumnEntity,
} from '@Database/common/enum/database.enum';
import { SERIALIZE_GROUP } from '@Database/common/enum/serialization-group.enum';
import { ExtendedEntity } from '@Database/common/extended-entity';
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(DB_TABLE_NAME.ROLE)
export class RoleEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn({ type: ENUMTypeColumnEntity.TYPE_ID })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_ROLE],
  })
  id: number;

  @Column({ type: 'varchar', length: 255, name: 'name', nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_ROLE],
  })
  name: string;
}
