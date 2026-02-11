export function b64ToUint8Array(b64: string): Uint8Array {
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

export function uint8ArrayToB64(bytes: Uint8Array): string {
    return btoa(String.fromCharCode(...bytes));
}
