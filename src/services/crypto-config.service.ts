import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'
import { generateAppKeyFromPassword } from '../utils/crypto.util'
import { CryptoRepo, CryptoRepoLive } from '../repositories/crypto.repo'

export interface ICryptoConfigService {
  readonly key: CryptoKey
  readonly iv: BufferSource
  readonly salt: BufferSource
  readonly saveKeyToSession: () => Fx.Effect<void, Error>
}

export class CryptoConfigService extends Ctx.Tag('CryptoConfigService')<
  CryptoConfigService,
  ICryptoConfigService
>() {}

// ── For Login: restore salt + iv from repo ─────────────────────────────────

export const CryptoConfigForLogin = (password: string) =>
  Lyr.effect(
    CryptoConfigService,
    Fx.gen(function* () {
      const repo = yield* CryptoRepo
      const salt = yield* repo.getSalt()
      const iv = yield* repo.getIv()
      const key = yield* generateAppKeyFromPassword(password, salt)
      return CryptoConfigService.of({
        key,
        iv: iv as BufferSource,
        salt: salt as BufferSource,
        saveKeyToSession: () => repo.saveKey(key),
      })
    })
  ).pipe(Lyr.provide(CryptoRepoLive))

// ── For Registration: generate salt + iv, save to repo ─────────────────────

export const CryptoConfigForRegistration = (password: string) =>
  Lyr.effect(
    CryptoConfigService,
    Fx.gen(function* () {
      const repo = yield* CryptoRepo
      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))

      yield* repo.saveSalt(salt)
      yield* repo.saveIv(iv)

      const key = yield* generateAppKeyFromPassword(password, salt)
      return CryptoConfigService.of({
        key,
        iv: iv as BufferSource,
        salt: salt as BufferSource,
        saveKeyToSession: () => Fx.void,
      })
    })
  ).pipe(Lyr.provide(CryptoRepoLive))

// ── For Session Restore: recover key from repo ─────────────────────────────

export const CryptoConfigFromSession = () =>
  Lyr.effect(
    CryptoConfigService,
    Fx.gen(function* () {
      const repo = yield* CryptoRepo
      const key = yield* repo.getKey()
      const salt = yield* repo.getSalt()
      const iv = yield* repo.getIv()
      return CryptoConfigService.of({
        key,
        iv: iv as BufferSource,
        salt: salt as BufferSource,
        saveKeyToSession: () => Fx.void,
      })
    })
  ).pipe(Lyr.provide(CryptoRepoLive))
