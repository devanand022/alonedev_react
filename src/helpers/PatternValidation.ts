import { Pattern } from "./Constants"

export const EmailValidation = (value: string): boolean => {
  return !Pattern.Email.test(value);
}

export const MobileValidation = (value: string): boolean => {
  return !Pattern.Mobile.test(value);
}
