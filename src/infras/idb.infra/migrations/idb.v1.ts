import type { DBSchema, IDBPDatabase } from 'idb'
import type {
  CredentialModel,
  ServerModel,
  UserModel,
  UserConfigModel,
  UserServerConfigModel,
} from '~/models'

// ---------------------- DB Schema ----------------------

export interface MirthDBSchemaV1 extends DBSchema {
  users: {
    key: number
    autoIncrement: true
    value: UserModel
    indexes: { 'by-username': string }
  },
  userConfigs: {
    key: number
    autoIncrement: true
    value: UserConfigModel
    indexes: { 'by-userId': number }
  }
  userServerConfigs: {
    key: number
    autoIncrement: true
    value: UserServerConfigModel
    indexes: { 'by-commitHash': string }
  }
  credentials: {
    key: number
    autoIncrement: true
    value: CredentialModel
    indexes: { 'by-userId': number }
  }
  servers: {
    key: number
    autoIncrement: true
    value: ServerModel
    indexes: { 'by-userId': number }
  }
}

// ---------------------- Migration ----------------------

export const idb_v1 = {
  version: 1,
  migrate: (db: IDBPDatabase<MirthDBSchemaV1>) => {
    // ---------------------- User ----------------------
    const userStore = db.createObjectStore('users', {
      keyPath: 'id',
    })
    userStore.createIndex('by-username', 'username', { unique: true })

    // ---------------------- User Config ----------------------
    const userConfigStore = db.createObjectStore('userConfigs', {
      keyPath: 'id',
    })
    userConfigStore.createIndex('by-userId', 'userId', { unique: true })

    // ---------------------- User Server Configs ----------------------

    const userServerConfigStore = db.createObjectStore('userServerConfigs', {
      keyPath: 'key',
    })
    userServerConfigStore.createIndex('by-commitHash', 'commitHash', {
      unique: true,
    })

    // ---------------------- Credentials ----------------------

    const credentialStore = db.createObjectStore('credentials', {
      keyPath: 'id',
    })
    credentialStore.createIndex('by-userId', 'userId', { unique: true })

    // ---------------------- Servers ----------------------

    const serverStore = db.createObjectStore('servers', {
      keyPath: 'id',
    })
    serverStore.createIndex('by-userId', 'userId', { unique: false })
  },
}
