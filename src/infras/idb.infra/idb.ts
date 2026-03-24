import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'
import { openDB, type IDBPDatabase } from 'idb'
import { idb_v1, type MirthDBSchemaV1 } from './migrations'

// ---------------------- Infra Interface ----------------------

export interface IIDBInfra {
  readonly db: IDBPDatabase<MirthDBSchemaV1>
}

// ---------------------- Context Tag ----------------------

export class IDBInfra extends Ctx.Tag('IDBInfra')<IDBInfra, IIDBInfra>() {}

// ---------------------- Live Implementation ----------------------

export const IDBInfraLive = Lyr.effect(
  IDBInfra,
  Fx.tryPromise({
    try: () =>
      openDB<MirthDBSchemaV1>('mirth-manager', 1, {
        upgrade(db, _oldVersion, newVersion) {
          switch (newVersion) {
            case 1:
              idb_v1.migrate(db)
              break
            default:
              throw new Error('Unsupported database version')
          }
        },
      }).then((db) => IDBInfra.of({ db })),
    catch: (e) => new Error(`Failed to open IndexedDB: ${e}`),
  })
)
