import { Effect as Fx, Context as Ctx, Layer as Lyr } from 'effect'
import { CryptoConfigService } from './crypto-config.service'

export interface ICryptoService {
  readonly encrypt: (text: string) => Fx.Effect<ArrayBuffer, Error>
  readonly decrypt: (encryptedData: ArrayBuffer) => Fx.Effect<string, Error>
}

export class CryptoService extends Ctx.Tag("CryptoService")<
  CryptoService,
  ICryptoService
>() {}

export const CryptoServiceLive = Lyr.effect(
  CryptoService,
  Fx.gen(function* () {
    const config = yield* CryptoConfigService
    return CryptoService.of({
      encrypt: (text: string) =>
        Fx.tryPromise({
          try: () => {
            const encoder = new TextEncoder()
            return crypto.subtle.encrypt(
              { name: 'AES-GCM', iv: config.iv },
              config.key,
              encoder.encode(text)
            )
          },
          catch: (error) => new Error(`Encryption failed: ${error}`),
        }),
      decrypt: (encryptedData: ArrayBuffer) =>
        Fx.tryPromise({
          try: async () => {
            const decrypted = await crypto.subtle.decrypt(
              { name: 'AES-GCM', iv: config.iv },
              config.key,
              encryptedData
            )
            const decoder = new TextDecoder()
            return decoder.decode(decrypted)
          },
          catch: (error) => new Error(`Decryption failed: ${error}`),
        }),
    })
  })
)