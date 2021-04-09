import Handlebars from 'handlebars';

import { getFormData } from '../../utils/utils'
import titles from '../../constants/titles';
import Aside from '../../components/aside/aside'
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import profileInfo from '../profile/profileMock';
import template from './profile_edit.html';
import './profile_edit.less';


// avatar
const profileAvatarOptions = {
  avatarSrc: profileInfo.src,
  avatarClass: 'avatar-big avatar-disabled',
}

// button
const saveButtonOptions = {
  buttonText: titles.SAVE, 
  buttonType: 'submit',
  clickHandler: e => {
    e.preventDefault();
    const form = document.forms.personInfo;
    if (form) {
      const data = getFormData(form);
      console.log(data)
    }
    location.href = 'profile.html'
  }
}

// inputs
const emailInputOptions = {
  label: titles.EMAIL,
  inputPlaceholder: titles.EMAIL_PLACEHOLDER,
  info: profileInfo.email,
  inputType: 'email',
  name: 'email',
  changeHandler: e => console.log('Email is:', e.target.value)
}

const loginInputOptions = {
  label: titles.LOGIN,
  inputPlaceholder: titles.LOGIN_PLACEHOLDER,
  info: profileInfo.login,
  name: 'login',
  changeHandler: e => console.log('Login is:', e.target.value)
}

const nameInputOptions = {
  label: titles.NAME,
  inputPlaceholder: titles.NAME_PLACEHOLDER,
  info: profileInfo.name,
  name: 'name',
  changeHandler: e => console.log('Name is:', e.target.value)
}

const surnameInputOptions = {
  label: titles.SURNAME,
  inputPlaceholder: titles.SURNAME_PLACEHOLDER,
  info: profileInfo.surname,
  name: 'surname',
  changeHandler: e => console.log('Surname is:', e.target.value)
}

const chatNameInputOptions = {
  label: titles.CHAT_NAME,
  inputPlaceholder: titles.CHANT_NAME_PLACEHOLDER,
  info: profileInfo.chatName,
  name: 'chatName',
  changeHandler: e => console.log('ChatName is:', e.target.value)
}

const phoneInputOptions = {
  label: titles.PHONE,
  inputPlaceholder: titles.PHONE_PLACEHOLDER,
  info: profileInfo.phone,
  name: 'phone',
  changeHandler: e => console.log('Phone number is:', e.target.value)
}

const aside = (new Aside()).render();
const profileAvatar = (new Avatar(profileAvatarOptions)).render();
const saveButton = (new Button(saveButtonOptions)).render();

const emailInput = (new Input(emailInputOptions)).render();
const loginInput = (new Input(loginInputOptions)).render();
const nameInput = (new Input(nameInputOptions)).render();
const surnameInput = (new Input(surnameInputOptions)).render();
const chatNameInput = (new Input(chatNameInputOptions)).render();
const phoneInput = (new Input(phoneInputOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ 
  profileAvatar, 
  aside, 
  saveButton, 
  emailInput, 
  loginInput, 
  nameInput, 
  surnameInput, 
  chatNameInput, 
  phoneInput
});
const root = document.querySelector('#profile-edit');
if (root) {
  root.innerHTML = pageToReturn;
}
