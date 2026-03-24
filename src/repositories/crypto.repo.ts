import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'
import {
  generateXorKey,
  exportAppKey,
  xor,
  importAppKey,
} from '../utils/crypto.util'
import { encodeBase64, decodeBase64 } from '../utils/base64.util'

// ---------------------- Interface ----------------------

export interface ICryptoRepo {
  readonly getSalt: () => Fx.Effect<Uint8Array, Error>
  readonly saveSalt: (salt: Uint8Array) => Fx.Effect<void, Error>
  readonly getIv: () => Fx.Effect<Uint8Array, Error>
  readonly saveIv: (iv: Uint8Array) => Fx.Effect<void, Error>
  readonly getKey: () => Fx.Effect<CryptoKey, Error>
  readonly saveKey: (key: CryptoKey) => Fx.Effect<void, Error>
}

// ---------------------- Tag ----------------------------

export class CryptoRepo extends Ctx.Tag('CryptoRepo')<
  CryptoRepo,
  ICryptoRepo
>() {}

// ---------------------- Live Layer -----------------------

export const CryptoRepoLive = Lyr.succeed(
  CryptoRepo,
  CryptoRepo.of({
    // ---------------------- Salt -----------------------
    getSalt: () =>
      Fx.gen(function* () {
        const saltB64 = localStorage.getItem('salt')
        if (!saltB64) return yield* Fx.fail(new Error('Salt not found'))
        return yield* decodeBase64(saltB64)
      }),

    saveSalt: (salt: Uint8Array) =>
      Fx.gen(function* () {
        const saltB64 = yield* encodeBase64(salt)
        localStorage.setItem('salt', saltB64)
      }),

    // ---------------------- IV ------------------------
    getIv: () =>
      Fx.gen(function* () {
        const ivB64 = localStorage.getItem('iv')
        if (!ivB64) return yield* Fx.fail(new Error('IV not found'))
        return yield* decodeBase64(ivB64)
      }),

    saveIv: (iv: Uint8Array) =>
      Fx.gen(function* () {
        const ivB64 = yield* encodeBase64(iv)
        localStorage.setItem('iv', ivB64)
      }),

    // ---------------------- Key (XOR-protected in sessionStorage + window.name) --------------
    getKey: () =>
      Fx.gen(function* () {
        const encryptedKeyB64 = sessionStorage.getItem('encryptedKey')
        const xorKeyB64 = window.name
        if (!encryptedKeyB64 || !xorKeyB64)
          return yield* Fx.fail(new Error('Key not found in session'))

        const encryptedKey = yield* decodeBase64(encryptedKeyB64)
        const xorKey = yield* decodeBase64(xorKeyB64)
        const keyBytes = yield* xor(encryptedKey, xorKey)
        return yield* importAppKey(keyBytes)
      }),

    saveKey: (key: CryptoKey) =>
      Fx.gen(function* () {
        const xorKey = yield* generateXorKey(32)
        const keyBytes = yield* exportAppKey(key)
        const encryptedKey = yield* xor(new Uint8Array(keyBytes), xorKey)
        const encryptedKeyB64 = yield* encodeBase64(encryptedKey)
        const xorKeyB64 = yield* encodeBase64(xorKey)
        sessionStorage.setItem('encryptedKey', encryptedKeyB64)
        window.name = xorKeyB64
      }),
  })
)
