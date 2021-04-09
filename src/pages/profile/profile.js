import Handlebars from 'handlebars';

import titles from '../../constants/titles';
import Aside from '../../components/aside/aside';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import template from './profile.html';
import profileInfo from './profileMock';
import './profile.less';

// avatar
const profileAvatarOptions = {
  avatarSrc: profileInfo.src,
  avatarClass: 'avatar-big',
  avatarError: 'Информация об ошибке'
}

// buttons
const changeInfoButtonOptions = {
  buttonText: titles.CHANGE_INFO, 
  buttonClass: 'button-link',
  clickHandler: () => location.href = 'profile_edit.html',
}

const changePasswordButtonOptions = {
  buttonText: titles.CHANGE_PASSWORD, 
  buttonClass: 'button-link',
  clickHandler: () => location.href = 'change_password.html',
}

const logoutButtonOptions = {
  buttonText: titles.LOGOUT, 
  buttonClass: 'button-link button-logout',
  clickHandler: () => location.href = 'index.html',
}

const aside = (new Aside()).render();
const profileAvatar = (new Avatar(profileAvatarOptions)).render();

const changeInfoButton = (new Button(changeInfoButtonOptions)).render();
const changePasswordButton = (new Button(changePasswordButtonOptions)).render();
const logoutButton = (new Button(logoutButtonOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ 
  profileAvatar, 
  aside, 
  profileInfo, 
  changeInfoButton, 
  changePasswordButton, 
  logoutButton,
  titles,
});
const root = document.querySelector('#profile');
if (root) {
  root.innerHTML = pageToReturn;
}
