import { Effect as Fx } from 'effect'

export const encrypt = (
  plaintext: string,
  iv: BufferSource,
  key: CryptoKey
): Fx.Effect<ArrayBuffer, Error> =>
  Fx.tryPromise({
    try: () => {
      const encoder = new TextEncoder()

      // Encrypt the plaintext
      return crypto.subtle.encrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        key,
        encoder.encode(plaintext)
      )
    },
    catch: (e) => new Error(String(e)),
  })

export const decrypt = (
  encryptedData: ArrayBuffer,
  iv: BufferSource,
  key: CryptoKey
): Fx.Effect<string, Error> =>
  Fx.tryPromise({
    try: async () => {
      const decoder = new TextDecoder()

      // Decrypt the data
      const decryptedData = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        key,
        encryptedData
      )

      // Convert ArrayBuffer back to string
      return decoder.decode(decryptedData)
    },
    catch: (e) => new Error(String(e)),
  })
