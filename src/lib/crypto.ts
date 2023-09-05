import CryptoJS from "crypto-js";

export const encryptData = (word: string, secretKey: string) => {
  const cipherText = CryptoJS.AES.encrypt(word, secretKey).toString();
  return cipherText;
};

export const decryptData = (cipherText: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  const originalData = bytes.toString(CryptoJS.enc.Utf8);
  return originalData;
};
