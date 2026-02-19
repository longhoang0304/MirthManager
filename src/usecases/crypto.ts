export function generateSalt(): BufferSource {
    return crypto.getRandomValues(new Uint8Array(16)) as BufferSource
}

export function generateIV(): BufferSource {
    return crypto.getRandomValues(new Uint8Array(12)) as BufferSource
}

export async function getEncryptionKey(password: string, salt: BufferSource) {
    const encoder = new TextEncoder();

    // 1. Import the raw password as a "base" key
    const baseKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveKey"]
    )

    // 2. Stretch it using PBKDF2
    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000, // High iteration count to resist brute force
            hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    )
}

export async function encryptData(
    plaintext: string,
    iv: BufferSource,
    key: CryptoKey,
): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    
    // Encrypt the plaintext
    return await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encoder.encode(plaintext)
    );
}

export async function decryptData(
    encryptedData: ArrayBuffer,
    iv: BufferSource,
    key: CryptoKey,
): Promise<string> {
    const decoder = new TextDecoder();
    
    // Decrypt the data
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedData
    );
    
    // Convert ArrayBuffer back to string
    return decoder.decode(decryptedData);
}

export async function exportKey(key: CryptoKey): Promise<Uint8Array> {
    const raw = await crypto.subtle.exportKey("raw", key)
    return new Uint8Array(raw)
}

export async function importKey(rawKey: Uint8Array): Promise<CryptoKey> {
    return crypto.subtle.importKey(
        "raw",
        rawKey as BufferSource,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    )
}

export function generateXorKey(length: number): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(length))
}

export function xorEncrypt(data: Uint8Array, xorKey: Uint8Array): Uint8Array {
    return data.map((byte, i) => byte ^ xorKey[i % xorKey.length])
}
