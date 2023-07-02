const crypto = require("crypto");
require("dotenv").config({ path: "../../.env" });

// Set encryption algorith
const algorithm = "aes-256-cbc";

/// Private key
// const key = crypto.randomBytes(32);
// const key = `${process.env.ENCRYPTION_KEY}`;
const secret = `one-two-buckle-my-shoe`;
const key = crypto
  .createHash("sha256")
  .update(String(secret))
  .digest("base64")
  .substr(0, 32);

// Random 16 digit initialization vector
// const iv = Buffer.from(crypto.randomBytes(16), "hex");

const encryptText = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  let encryptedData = cipher.update(text);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);

  //   return {
  //     iv: iv.toString("hex"),
  //     encryptedData: encryptedData.toString("hex"),
  //   };

  // return encryptedData.toString("hex");

  return iv.toString("hex") + encryptedData.toString("hex");
};

const decryptText = (text) => {
  const iv = Buffer.from(text.substr(0, 32), "hex");
  // Convert initialize vector from base64 to hex
  const encryptedData = Buffer.from(text.substr(32), "hex");

  // Decrypt the string using encryption algorith and private key
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

  //   const decryptedData = Buffer.concat([
  //     decipher.update(Buffer.from(text.encryptedData, "hex")),
  //     decipher.final(),
  //   ]);

  return decryptedData.toString();
};

// // Example usage
// const e = encryptText("0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2");
// console.log("Encrypted: " + e);
// const d = decryptText(e);
// console.log("Decrypted: " + d);

module.exports = {
  encryptText,
  decryptText,
};
