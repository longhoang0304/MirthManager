import { Schema } from 'effect'
import { Effect as Fx } from 'effect'


export const decodeBase64 = (b64: string): Fx.Effect<Uint8Array, Error> =>
  Schema.decode(Schema.Uint8ArrayFromBase64)(b64)

export const encodeBase64 = (bytes: Uint8Array): Fx.Effect<string, Error> =>
  Schema.encode(Schema.Uint8ArrayFromBase64)(bytes)
