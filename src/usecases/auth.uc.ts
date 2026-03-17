import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'

import { CryptoService, CryptoServiceLive } from '~/services/crypto.service'
import {
  CryptoConfigService,
  CryptoConfigForLogin,
  CryptoConfigForRegistration,
  CryptoConfigFromKey,
} from '~/services/crypto-config.service'
import {
  generateXorKey,
  xor,
  exportAppKey,
  importAppKey,
} from '~/utils/crypto.util'
import { encodeBase64, decodeBase64 } from '~/utils/base64.util'

// ── Custom Errors ──────────────────────────────────────────────────────────

export class NotRegisteredError {
  readonly _tag = 'NotRegisteredError'
}

export class NoSessionError {
  readonly _tag = 'NoSessionError'
}

export class DecryptionError {
  readonly _tag = 'DecryptionError'
  readonly reason: unknown
  constructor(reason: unknown) {
    this.reason = reason
  }
}

export type AuthError = NotRegisteredError | DecryptionError | Error

// ── Service Interface ──────────────────────────────────────────────────────

export interface IAuthUseCase {
  readonly login: (
    password: string
  ) => Fx.Effect<Record<string, unknown>, AuthError>
  readonly register: (
    name: string,
    password: string
  ) => Fx.Effect<void, Error>
  readonly restoreSession: () => Fx.Effect<
    Record<string, unknown> | null,
    AuthError
  >
}

// ── Context Tag ────────────────────────────────────────────────────────────

export class AuthUseCase extends Ctx.Tag('AuthUseCase')<
  AuthUseCase,
  IAuthUseCase
>() {}

// ── Helpers ────────────────────────────────────────────────────────────────

const decryptStoredData = Fx.gen(function* () {
  const cs = yield* CryptoService
  const dataB64 = localStorage.getItem('data')
  if (!dataB64) return {}

  const encryptedBytes = yield* decodeBase64(dataB64)
  const encryptedData = encryptedBytes.buffer.slice(
    encryptedBytes.byteOffset,
    encryptedBytes.byteOffset + encryptedBytes.byteLength
  ) as ArrayBuffer

  const decrypted = yield* cs.decrypt(encryptedData)
  return JSON.parse(decrypted) as Record<string, unknown>
})

const saveKeyToSession = (key: CryptoKey) =>
  Fx.gen(function* () {
    const xorKey = yield* generateXorKey(32)
    const keyBytes = yield* exportAppKey(key)
    const encryptedKey = yield* xor(new Uint8Array(keyBytes), xorKey)
    const encryptedKeyB64 = yield* encodeBase64(encryptedKey)
    const xorKeyB64 = yield* encodeBase64(xorKey)
    sessionStorage.setItem('encryptedKey', encryptedKeyB64)
    window.name = xorKeyB64
  })

// ── Live Implementation ────────────────────────────────────────────────────

export const AuthUseCaseLive = Lyr.succeed(
  AuthUseCase,
  AuthUseCase.of({
    login: (password: string) =>
      Fx.gen(function* () {
        const config = yield* CryptoConfigService
        const result = yield* decryptStoredData
        yield* saveKeyToSession(config.key)
        return result
      }).pipe(
        Fx.provide(CryptoServiceLive),
        Fx.provide(CryptoConfigForLogin(password)),
      ),

    register: (name: string, password: string) =>
      Fx.gen(function* () {
        const cs = yield* CryptoService
        const data = JSON.stringify({ user: name })
        const encrypted = yield* cs.encrypt(data)
        const encryptedB64 = yield* encodeBase64(new Uint8Array(encrypted))
        localStorage.setItem('data', encryptedB64)
      }).pipe(
        Fx.provide(CryptoServiceLive),
        Fx.provide(CryptoConfigForRegistration(password)),
      ),

    restoreSession: () =>
      Fx.gen(function* () {
        const encryptedKeyB64 = sessionStorage.getItem('encryptedKey')
        const xorKeyB64 = window.name
        if (!encryptedKeyB64 || !xorKeyB64) return null

        const encryptedKey = yield* decodeBase64(encryptedKeyB64)
        const xorKey = yield* decodeBase64(xorKeyB64)
        const keyBytes = yield* xor(encryptedKey, xorKey)
        const key = yield* importAppKey(keyBytes)

        return yield* decryptStoredData.pipe(
          Fx.provide(CryptoServiceLive),
          Fx.provide(CryptoConfigFromKey(key)),
        )
      }),
  })
)
