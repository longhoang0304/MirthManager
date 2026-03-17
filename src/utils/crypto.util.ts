import { Effect as Fx } from 'effect'

export const generateSalt = (): Fx.Effect<Uint8Array> =>
  Fx.sync(() => crypto.getRandomValues(new Uint8Array(16)))

export const generateIV = (): Fx.Effect<Uint8Array> =>
  Fx.sync(() => crypto.getRandomValues(new Uint8Array(12)))

export const generateXorKey = (length: number): Fx.Effect<Uint8Array> =>
  Fx.sync(() => crypto.getRandomValues(new Uint8Array(length)))

export const xor = (
  data: Uint8Array,
  xorKey: Uint8Array
): Fx.Effect<Uint8Array> =>
  Fx.sync(() => data.map((byte, i) => byte ^ xorKey[i % xorKey.length]))

export const exportAppKey = (key: CryptoKey): Fx.Effect<ArrayBuffer> =>
  Fx.promise(() => crypto.subtle.exportKey('raw', key))

export const importAppKey = (rawKey: Uint8Array): Fx.Effect<CryptoKey> =>
  Fx.promise(() =>
    crypto.subtle.importKey(
      'raw',
      rawKey as BufferSource,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )
  )

export const generateAppKeyFromPassword = (
  password: string,
  salt: Uint8Array
): Fx.Effect<CryptoKey> =>
  Fx.gen(function* () {
    const encoder = new TextEncoder()
    const keyMaterial = encoder.encode(password)

    const baseKey = yield* Fx.promise(() =>
      crypto.subtle.importKey('raw', keyMaterial, { name: 'PBKDF2' }, false, [
        'deriveKey',
      ])
    )

    const derivedKey = yield* Fx.promise(() =>
      crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt as BufferSource,
          iterations: 100000,
          hash: 'SHA-256',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      )
    )

    return derivedKey
  })
