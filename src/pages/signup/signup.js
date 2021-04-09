import Handlebars from 'handlebars';

import { getFormData } from '../../utils/utils'
import titles from '../../constants/titles';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import template from './signup.html';
import '../login/index.less';

// buttons
const signupButtonOptions = {
  buttonText: titles.SIGNUP, 
  buttonType: 'submit',
  clickHandler: e => {
    e.preventDefault();
    const form = document.forms.signup;
    if (form) {
      const data = getFormData(form);
      console.log(data)
    }
    location.href = 'chats.html'
  }
}

const rememberAllButtonOptions = {
  buttonText: titles.REMEMBER_ALL, 
  buttonClass: 'button-link',
  clickHandler: () => location.href = 'index.html',
}

// inputs
const emailInputOptions = {
  label: titles.EMAIL,
  inputPlaceholder: titles.EMAIL_PLACEHOLDER,
  inputType: 'email',
  name: 'email',
  changeHandler: e => console.log('Email is:', e.target.value)
}

const loginInputOptions = {
  label: titles.LOGIN,
  inputPlaceholder: titles.LOGIN_PLACEHOLDER,
  name: 'login',
  changeHandler: e => console.log('Login is:', e.target.value)
}

const nameInputOptions = {
  label: titles.NAME,
  inputPlaceholder: titles.NAME_PLACEHOLDER,
  name: 'name',
  changeHandler: e => console.log('Name is:', e.target.value)
}

const surnameInputOptions = {
  label: titles.SURNAME,
  inputPlaceholder: titles.SURNAME_PLACEHOLDER,
  name: 'surname',
  changeHandler: e => console.log('Surname is:', e.target.value)
}

const passwordInputOptions = {
  label: titles.PASSWORD,
  inputPlaceholder: titles.PASSWORD_PLACEHOLDER,
  inputType: 'password',
  name: 'password',
  changeHandler: e => console.log('Password is:', e.target.value)
}

const passwordRepeatInputOptions = {
  label: titles.PASSWORD_REPEAT,
  inputPlaceholder: titles.PASSWORD_REPEAT_PLACEHOLDER,
  inputType: 'password',
  name: 'passwordRepeat',
  changeHandler: e => console.log('Password repeat is:', e.target.value)
}

const signupButton = (new Button(signupButtonOptions)).render();
const rememberAllButton = (new Button(rememberAllButtonOptions)).render();

const emailInput = (new Input(emailInputOptions)).render();
const loginInput = (new Input(loginInputOptions)).render();
const nameInput = (new Input(nameInputOptions)).render();
const surnameInput = (new Input(surnameInputOptions)).render();
const passwordInput = (new Input(passwordInputOptions)).render();
const passwordRepeatInput = (new Input(passwordRepeatInputOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ 
  emailInput, 
  loginInput, 
  nameInput, 
  surnameInput, 
  passwordInput, 
  passwordRepeatInput, 
  signupButton, 
  rememberAllButton,
  titles,
});
const root = document.querySelector('#signup');
if (root) {
  root.innerHTML = pageToReturn;
}
