import validator from "validator";

export function isEmpty(str: string | undefined) {
  return str === undefined || (str !== undefined && validator.isEmpty(str));
}

export function isEmail(email: string) {
  return !isEmpty(email) && validator.isEmail(email);
}
