import Handlebars from 'handlebars';

import { getFormData } from '../../utils/utils'
import titles from '../../constants/titles';
import Aside from '../../components/aside/aside'
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import profileInfo from '../profile/profileMock';
import template from './change_password.html';
import './change_password.less';

const profileAvatarOptions = {
  avatarSrc: profileInfo.src,
  avatarClass: 'avatar-big avatar-disabled',
}

const saveButtonOptions = {
  buttonText: titles.SAVE, 
  buttonType: 'submit',
  clickHandler: e => {
    e.preventDefault();
    const form = document.forms.changePassword;
    if (form) {
      const data = getFormData(form);
      console.log(data);
    }
    location.href = 'profile.html'
  }
}

const oldPasswordInputOptions = {
  label: titles.OLD_PASSWORD,
  inputPlaceholder: titles.OLD_PASSWORD_PLACEHOLDER,
  info: profileInfo.password,
  inputType: 'password',
  name: 'oldPassword',
  changeHandler: e => console.log('Password is:', e.target.value)
}

const newPasswordInputOptions = {
  label: titles.NEW_PASSWORD,
  inputPlaceholder: titles.PASSWORD_PLACEHOLDER,
  inputType: 'password',
  name: 'newPassword',
  changeHandler: e => console.log('New password is:', e.target.value)
}

const newPasswordRepeatInputOptions = {
  label: titles.PASSWORD_REPEAT,
  inputPlaceholder: titles.PASSWORD_REPEAT_PLACEHOLDER,
  inputType: 'password',
  name: 'passwordRepeat',
  changeHandler: e => console.log('Password repeat is:', e.target.value)
}

const aside = (new Aside()).render();
const profileAvatar = (new Avatar(profileAvatarOptions)).render();
const saveButton = (new Button(saveButtonOptions)).render();

// inputs
const oldPasswordInput = (new Input(oldPasswordInputOptions)).render();
const newPasswordInput = (new Input(newPasswordInputOptions)).render();
const newPasswordRepeatInput = (new Input(newPasswordRepeatInputOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ 
  profileAvatar, 
  aside, 
  saveButton, 
  oldPasswordInput, 
  newPasswordInput, 
  newPasswordRepeatInput 
});
const root = document.querySelector('#change-password');
if (root) {
  root.innerHTML = pageToReturn;
}
