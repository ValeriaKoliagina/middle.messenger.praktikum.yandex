import inputNames from '../constants/inputNames';
import errors from '../constants/errors';

const isEmail = (email: string): string => {
  const pattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return pattern.test(email) ? '' : errors.EMAIL_INVALID;
};

const isPassword = (password: string): string => {
  const pattern = /(?=.*\d)(?=.*[a-z/а-я])(?=.*[A-Z/А-Я]).{8,}/;

  return pattern.test(password) ? '' : errors.PASSWORD_INVALID;
};

const isPasswordSame = (repeatedPassword: string): string => {
  const password = (<HTMLInputElement>(document.querySelector(`input[name="${inputNames.PASSWORD}"]`))).value;

  return repeatedPassword === password ? '' : errors.PASSWORD_REPEAT;
};

const isNotEmpty = (value: string): string => value ? '' : errors.FILL_FIELD;

const isPhone = (phone: string): string => {
  const pattern = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

  return pattern.test(phone.replace(' ', '')) ? '' : errors.PHONE_INVALID;
};

export {
  isEmail,
  isNotEmpty,
  isPassword,
  isPasswordSame,
  isPhone,
};
