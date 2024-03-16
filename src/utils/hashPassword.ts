import bcrypt from "bcrypt";

export function hashPassword(password: string, saltRounds = 10) {
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}
