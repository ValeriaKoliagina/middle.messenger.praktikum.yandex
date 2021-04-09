import Handlebars from 'handlebars';

import { getFormData } from '../../utils/utils'
import titles from '../../constants/titles';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import template from './index.html';
import './index.less';

// buttons 
const loginButtonOptions = {
  buttonText: titles.ENTER, 
  buttonType: 'submit',
  clickHandler: e => {
    e.preventDefault();
    const form = document.forms.login;
    if (form) {
      const data = getFormData(form);
      console.log(data);
    }
    location.href = 'chats.html';
  },
}

const registerButtonOptions = {
  buttonText: titles.LINK_TO_SIGN_UP, 
  buttonClass: 'button-link',
  clickHandler: () => location.href = 'signup.html',
}

// inputs
const loginInputOptions = {
  label: titles.LOGIN,
  inputPlaceholder: titles.LOGIN_PLACEHOLDER,
  name: 'login',
  changeHandler: e => console.log('Login is:', e.target.value)
}

const passwordInputOptions = {
  label: titles.PASSWORD,
  inputPlaceholder: titles.PASSWORD_PLACEHOLDER,
  inputType: 'password',
  name: 'password',
  changeHandler: e => console.log('Password is:', e.target.value)
}

const loginButton = (new Button(loginButtonOptions)).render();
const registerButton = (new Button(registerButtonOptions)).render();

const loginInput = (new Input(loginInputOptions)).render();
const passwordInput = (new Input(passwordInputOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ loginInput, passwordInput, loginButton, registerButton, titles });
const root = document.querySelector('#root');
if (root) {
  root.innerHTML = pageToReturn;
}
