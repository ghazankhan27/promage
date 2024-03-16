import bcrypt from "bcrypt";

export function validatePassword(
  plainTextPassword: string,
  passwordHash: string
) {
  const isPasswordValid = bcrypt.compareSync(plainTextPassword, passwordHash);
  return isPasswordValid;
}
