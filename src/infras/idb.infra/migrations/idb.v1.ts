import type { IDBPDatabase } from "idb"

export const idb_v1 = {
  version: 1,
  migrate: (db: IDBPDatabase) => {
    db.createObjectStore('settings', { keyPath: 'key' })
    db.createObjectStore('credentials', { keyPath: 'id' })
    db.createObjectStore('servers', { keyPath: 'id' })
  },
}
