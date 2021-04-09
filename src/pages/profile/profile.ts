import Handlebars from 'handlebars';

import { IAvatarOptions, IButtonOptions, IProfilePageOptions } from '../../utils/interfaces';
import titles from '../../constants/titles';
import Aside from '../../components/aside/aside';
import Avatar from '../../components/avatar/avatar';
import Block from '../../components/block/block';
import Button from '../../components/button/button';
import profile from './profile.html';
import profileInfo from './profileMock';
import './profile.less';

const REDIRECTIONS = {
  'change-info-button': 'profile_edit.html',
  'change-password-button': 'change_password.html',
  'logout-button': 'login.html',
};

class Profile extends Block {
  constructor(rootId: string) {

    // avatar
    const profileAvatarOptions: IAvatarOptions = {
      avatarSrc: profileInfo.src,
      avatarClass: 'avatar-big',
      avatarError: 'Информация об ошибке'
    };

    // buttons
    const changeInfoButtonOptions: IButtonOptions = {
      buttonText: titles.CHANGE_INFO,
      buttonClass: 'button-link',
      events: { click: (event: Event) => this._redirect(event) },
      elementId: 'change-info-button',
    };

    const changePasswordButtonOptions: IButtonOptions = {
      buttonText: titles.CHANGE_PASSWORD,
      buttonClass: 'button-link',
      events: { click: (event: Event) => this._redirect(event) },
      elementId: 'change-password-button',
    };

    const logoutButtonOptions: IButtonOptions = {
      buttonText: titles.LOGOUT,
      buttonClass: 'button-link button-logout',
      events: { click: (event: Event) => this._redirect(event) },
      elementId: 'logout-button',
    };

    const aside = new Aside();
    const profileAvatar = new Avatar(profileAvatarOptions);

    const changeInfoButton = new Button(changeInfoButtonOptions);
    const changePasswordButton = new Button(changePasswordButtonOptions);
    const logoutButton = new Button(logoutButtonOptions);

    const options = {
      lemur: true,
      aside,
      profileAvatar,
      changeInfoButton,
      changePasswordButton,
      logoutButton,
    };

    super(options, rootId);
  }

  private _redirect(event: Event): void {
    location.href = REDIRECTIONS[(<HTMLButtonElement>event.target).id];
  }

  render(): string {
    const template = Handlebars.compile(profile);

    return template({
      elementId: this.props.elementId,
      aside: (<IProfilePageOptions> this.props).aside.render(),
      profileAvatar: (<IProfilePageOptions> this.props).profileAvatar.render(),
      changeInfoButton: (<IProfilePageOptions> this.props).changeInfoButton.render(),
      changePasswordButton: (<IProfilePageOptions> this.props).changePasswordButton.render(),
      logoutButton: (<IProfilePageOptions> this.props).logoutButton.render(),
      titles,
      profileInfo,
    });
  }
}

new Profile('profile');
