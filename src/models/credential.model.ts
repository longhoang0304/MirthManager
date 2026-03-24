export interface CredentialModel {
  id?: number
  userId: number
  salt: Uint8Array
  iv: Uint8Array
  keyCheck: Uint8Array
  encryptionKey?: Uint8Array
}
