import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'

import { CryptoService, CryptoServiceLive } from '~/services/crypto.service'
import {
  CryptoConfigService,
  CryptoConfigForLogin,
  CryptoConfigForRegistration,
  CryptoConfigFromSession,
} from '~/services/crypto-config.service'
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

const withCryptoService = (configLayer: Lyr.Layer<CryptoConfigService, Error>) =>
  Lyr.merge(configLayer, CryptoServiceLive.pipe(Lyr.provide(configLayer)))

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


// ── Live Implementation ────────────────────────────────────────────────────

export const AuthUseCaseLive = Lyr.succeed(
  AuthUseCase,
  AuthUseCase.of({
    login: (password: string) =>
      Fx.gen(function* () {
        const config = yield* CryptoConfigService
        const result = yield* decryptStoredData
        yield* config.saveKeyToSession()
        return result
      }).pipe(
        Fx.provide(withCryptoService(CryptoConfigForLogin(password))),
      ),

    register: (name: string, password: string) =>
      Fx.gen(function* () {
        const cs = yield* CryptoService
        const data = JSON.stringify({ user: name })
        const encrypted = yield* cs.encrypt(data)
        const encryptedB64 = yield* encodeBase64(new Uint8Array(encrypted))
        localStorage.setItem('data', encryptedB64)
      }).pipe(
        Fx.provide(withCryptoService(CryptoConfigForRegistration(password))),
      ),

    restoreSession: () =>
      decryptStoredData.pipe(
        Fx.provide(withCryptoService(CryptoConfigFromSession())),
      ),
  })
)
