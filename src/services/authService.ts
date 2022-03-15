import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

async function hashPassword(password: string) {
  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return hashed;
  } catch {
    return;
  }
}

async function comparePassword(
  password: string,
  stored_password: string
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(password, stored_password);
    return result;
  } catch {
    return false;
  }
}

export default {
  hashPassword,
  comparePassword,
};
