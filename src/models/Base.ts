import * as crypto from "crypto";

export function generateUID(): string {
  return crypto
    .randomBytes(16)
    .toString("base64")
    .replace("==", "")
    .replace("/", "a");
}
