import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'
import { generateAppKeyFromPassword } from '../utils/crypto.util'
import { encodeBase64, decodeBase64 } from '../utils/base64.util'

export interface ICryptoConfigService {
  readonly key: CryptoKey
  readonly iv: BufferSource
  readonly salt: BufferSource
}

export class CryptoConfigService extends Ctx.Tag("CryptoConfigService")<
  CryptoConfigService,
  ICryptoConfigService
>() {}

// ── For Login: restore salt + iv from localStorage ─────────────────────────

export const CryptoConfigForLogin = (password: string) =>
  Lyr.effect(
    CryptoConfigService,
    Fx.gen(function* () {
      const saltB64 = localStorage.getItem('salt')
      const ivB64 = localStorage.getItem('iv')
      if (!saltB64 || !ivB64) return yield* Fx.fail(new Error('Not registered'))

      const salt = yield* decodeBase64(saltB64)
      const iv = yield* decodeBase64(ivB64)
      const key = yield* generateAppKeyFromPassword(password, salt)
      return CryptoConfigService.of({ key, iv: iv as BufferSource, salt: salt as BufferSource })
    })
  )

// ── For Registration: generate salt + iv, save to localStorage ─────────────

export const CryptoConfigForRegistration = (password: string) =>
  Lyr.effect(
    CryptoConfigService,
    Fx.gen(function* () {
      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))

      const saltB64 = yield* encodeBase64(salt)
      const ivB64 = yield* encodeBase64(iv)
      localStorage.setItem('salt', saltB64)
      localStorage.setItem('iv', ivB64)

      const key = yield* generateAppKeyFromPassword(password, salt)
      return CryptoConfigService.of({ key, iv: iv as BufferSource, salt: salt as BufferSource })
    })
  )

// ── For Session Restore: restore salt + iv from localStorage, use provided key

export const CryptoConfigFromKey = (key: CryptoKey) =>
  Lyr.effect(
    CryptoConfigService,
    Fx.gen(function* () {
      const saltB64 = localStorage.getItem('salt')
      const ivB64 = localStorage.getItem('iv')
      if (!saltB64 || !ivB64) return yield* Fx.fail(new Error('Not registered'))

      const salt = yield* decodeBase64(saltB64)
      const iv = yield* decodeBase64(ivB64)
      return CryptoConfigService.of({ key, iv: iv as BufferSource, salt: salt as BufferSource })
    })
  )