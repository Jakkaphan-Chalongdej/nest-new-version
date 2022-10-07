export enum DB_TABLE_NAME {
  MEDIAL_OBJECT = 'media_object',
  PERMISSION = 'permission',
  MENU = 'menu',
  ROLE = 'role',
  USER = 'user',
  ADMIN = 'admin',
}

export enum ENUMBaseEntity {
  ID = 'id',
}

export enum ENUMCommonEntity {
  IS_DELETE = 'is_delete',
  CREATED_AT = 'created_at',
  DELETED_AT = 'deleted_at',
  UPDATED_AT = 'updated_at',
}

export enum ENUMTypeColumnEntity {
  TYPE_ID = 'int4',
  TYPE_DATE = 'int8',
  TYPE_TIMESTAMP_TZ = 'timestamptz',
}
