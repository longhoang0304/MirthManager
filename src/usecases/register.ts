import {generateIV, generateSalt, getEncryptionKey, encryptData} from "~/usecases/crypto";
import {uint8ArrayToB64} from "~/usecases/b64";

export async function register(name: string, password: string) {
    const salt = generateSalt()
    const iv = generateIV()
    localStorage.setItem('salt', uint8ArrayToB64(salt as Uint8Array))
    localStorage.setItem('iv', uint8ArrayToB64(iv as Uint8Array))

    const key = await getEncryptionKey(password, salt)
    const data = JSON.stringify({'user': name})
    const encrypted = await encryptData(data, iv, key)
    localStorage.setItem('data', uint8ArrayToB64(new Uint8Array(encrypted)))
}
