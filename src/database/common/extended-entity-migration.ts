import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';
import {
  ENUMBaseEntity,
  ENUMCommonEntity,
  ENUMTypeColumnEntity,
} from './enum/database.enum';

export const baseEntityMigration: TableColumnOptions[] = [
  {
    name: ENUMBaseEntity.ID,
    type: ENUMTypeColumnEntity.TYPE_ID,
    isPrimary: true,
    isGenerated: true,
  },
];

export const commonEntityMigration: TableColumnOptions[] = [
  {
    name: ENUMCommonEntity.IS_DELETE,
    type: 'bool',
    default: false,
  },
  {
    default: 'NOW()',
    name: ENUMCommonEntity.CREATED_AT,
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
  },
  {
    default: 'NOW()',
    name: ENUMCommonEntity.UPDATED_AT,
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
  },
  {
    name: ENUMCommonEntity.DELETED_AT,
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    isNullable: true,
  },
];
