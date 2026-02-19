import { getEncryptionKey, decryptData, generateXorKey, xorEncrypt, exportKey, importKey } from "~/usecases/crypto";
import { b64ToUint8Array, uint8ArrayToB64 } from "~/usecases/b64";

export async function login(password: string) {
    const saltB64 = localStorage.getItem('salt');
    const ivB64 = localStorage.getItem('iv');

    if (!saltB64 || !ivB64) {
        throw new Error('Not registered.');
    }

    const salt = b64ToUint8Array(saltB64) as BufferSource;
    const iv = b64ToUint8Array(ivB64) as BufferSource;

    const dataB64 = localStorage.getItem('data');
    if (!dataB64) {
        return {}
    }

    const key = await getEncryptionKey(password, salt)
    const encryptedBytes = b64ToUint8Array(dataB64)
    const encryptedData = encryptedBytes.buffer.slice(encryptedBytes.byteOffset, encryptedBytes.byteOffset + encryptedBytes.byteLength) as ArrayBuffer
    const decrypted = await decryptData(encryptedData, iv, key)

    // save decrypt key so that user doesn't have to enter password when refresh a page
    const xorKey = generateXorKey(32)
    const keyBytes = await exportKey(key)
    const encryptedKey = xorEncrypt(keyBytes, xorKey)

    sessionStorage.setItem('encryptedKey', uint8ArrayToB64(encryptedKey))
    window.name = uint8ArrayToB64(xorKey)

    return JSON.parse(decrypted);
}

export async function restoreSession() {
    const encryptedKeyB64 = sessionStorage.getItem('encryptedKey')
    const xorKeyB64 = window.name

    if (!encryptedKeyB64 || !xorKeyB64) return null

    const encryptedKey = b64ToUint8Array(encryptedKeyB64)
    const xorKey = b64ToUint8Array(xorKeyB64)
    const keyBytes = xorEncrypt(encryptedKey, xorKey)
    const key = await importKey(keyBytes)

    const saltB64 = localStorage.getItem('salt')
    const ivB64 = localStorage.getItem('iv')

    if (!saltB64 || !ivB64) {
        throw new Error('Not registered.')
    }

    const iv = b64ToUint8Array(ivB64) as BufferSource

    const dataB64 = localStorage.getItem('data')
    if (!dataB64) {
        return {}
    }

    const encryptedBytes = b64ToUint8Array(dataB64)
    const encryptedData = encryptedBytes.buffer.slice(encryptedBytes.byteOffset, encryptedBytes.byteOffset + encryptedBytes.byteLength) as ArrayBuffer
    const decrypted = await decryptData(encryptedData, iv, key)

    return JSON.parse(decrypted)
}