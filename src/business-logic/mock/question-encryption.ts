import { Question } from "./question-repo";

const key = "omar".padEnd(16, " ").slice(0, 16);

// Helper function to convert a string to an ArrayBuffer
function stringToArrayBuffer(str: string) {
  return new TextEncoder().encode(str);
}

// Helper function to convert an ArrayBuffer to a string
function arrayBufferToString(buffer: ArrayBuffer) {
  return new TextDecoder().decode(buffer);
}

// Encryption function
export async function encryptQuestion(question: Question) {
  const message = JSON.stringify(question);
  // Generate a cryptographic key from the string key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    stringToArrayBuffer(key),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Generate a random initialization vector (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the message
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    stringToArrayBuffer(message)
  );

  // Return the encrypted data and IV as base64 strings
  return {
    iv: btoa(String.fromCharCode(...iv)),
    encryptedData: btoa(
      String.fromCharCode(...new Uint8Array(encryptedBuffer))
    ),
  };
}

// Decryption function
export async function decryptQuestion(
  encryptedData: string,
  iv: string
): Promise<Question> {
  // Generate a cryptographic key from the string key
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    stringToArrayBuffer(key),
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  // Convert the base64 IV and encrypted data back to ArrayBuffer
  const ivBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
  const encryptedBuffer = Uint8Array.from(atob(encryptedData), (c) =>
    c.charCodeAt(0)
  );

  // Decrypt the message
  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBuffer },
    cryptoKey,
    encryptedBuffer
  );

  // Return the decrypted message as a string
  return JSON.parse(arrayBufferToString(decryptedBuffer)) as Question;
}
