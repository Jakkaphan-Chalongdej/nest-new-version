import { DB_TABLE_NAME } from '@Database/common/enum/database.enum';
import { ExtendedEntity } from '@Database/common/extended-entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from './role.entity';
import { SERIALIZE_GROUP } from '@Database/common/enum/serialization-group.enum';
import { Expose } from 'class-transformer';

@Entity(DB_TABLE_NAME.USER)
export class UserEntity extends ExtendedEntity {
  @Column({ name: 'is_active', default: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  isActive: boolean;

  @PrimaryGeneratedColumn()
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  id: number;

  @Column({ name: 'first_name', length: 255 })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  firstName: string;

  @Column({ name: 'last_name', length: 255 })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  lastName: string;

  @Column({ length: 15, nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  phone: string;

  @Column({ length: 50 })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  username: string;

  @Column({ select: false })
  @Expose({
    groups: [],
  })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPassword() {
    const salt = await bcrypt.genSalt(10);
    if (!this?.password?.startsWith('$2a$')) {
      const encryptPassword = await bcrypt.hash(this.password, salt);
      this.password = encryptPassword;
    }
  }

  @ManyToOne(() => RoleEntity, { nullable: true })
  @Expose({
    groups: [SERIALIZE_GROUP.GROUP_USER],
  })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
