import { openDB, type IDBPDatabase } from 'idb'
import { idb_v1 } from './migrations'

const db = await openDB('mirth-manager', 1, {
  upgrade(db: IDBPDatabase, oldVersion: number, newVersion: number) {
    switch (newVersion) {
      case 1:
        idb_v1.migrate(db)
        break
      default:
        throw new Error('Unsupported database version')
    }
  },
})

export default db
