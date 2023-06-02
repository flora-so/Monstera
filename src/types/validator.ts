import type { InputValidator } from "./global";

export const emailValidator: InputValidator = (value: string) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return "Please enter a valid email";
  } else {
    return "";
  }
}

export const passwordValidator: InputValidator = (value: string) => {
  if (value.length < 8 && value.length > 0) {
    return "Password must be at least 8 characters";
  } else if (!/\?=.*[a-z]/.test(value)) {
    return "Password must contain at least one lowercase letter";
  } else if (!/\?=.*[A-Z]/.test(value)) {
    return "Password must contain at least one uppercase letter";
  } else if (!/\?=.*[0-9]/.test(value)) {
    return "Password must contain at least one number";
  } else if (!/\?=.*[!@#$%^&*]/.test(value)) {
    return "Password must contain at least one special character";
  } else {
    return "";
  }
}

export const numberValidator: InputValidator = (value: string) => {
  if (!/\D/.test(value)) {
    return "Please enter only numbers";
  } else {
    return "";
  }
}