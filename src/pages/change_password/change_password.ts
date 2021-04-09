import Handlebars from 'handlebars';

import { IAvatarOptions, IButtonOptions, IChangePasswordPageOptions, IInputOptions } from '../../utils/interfaces';
import { getFormData, getName } from '../../utils/utils';
import inputNames from '../../constants/inputNames';
import { isPassword, isPasswordSame } from '../../utils/validations';
import titles from '../../constants/titles';
import Aside from '../../components/aside/aside';
import Block from '../../components/block/block';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import profileInfo from '../profile/profileMock';
import changePassword from './change_password.html';
import './change_password.less';

class ChangePassword extends Block {
  constructor(rootId: string) {

    const profileAvatarOptions: IAvatarOptions = {
      avatarSrc: profileInfo.src,
      avatarClass: 'avatar-big avatar-disabled',
    };

    const saveButtonOptions: IButtonOptions = {
      buttonText: titles.SAVE,
      buttonType: 'submit',
      events: { click: (event: Event) => this._enter(event) }
    };

    const oldPasswordInputOptions: IInputOptions = {
      label: titles.OLD_PASSWORD,
      inputPlaceholder: titles.OLD_PASSWORD_PLACEHOLDER,
      info: profileInfo.password,
      inputType: inputNames.PASSWORD,
      name: inputNames.OLD_PASSWORD,
      validateFunctions: [isPassword],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const newPasswordInputOptions: IInputOptions = {
      label: titles.NEW_PASSWORD,
      inputPlaceholder: titles.PASSWORD_PLACEHOLDER,
      inputType: inputNames.PASSWORD,
      name: inputNames.PASSWORD,
      validateFunctions: [isPassword],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const newPasswordRepeatInputOptions: IInputOptions = {
      label: titles.PASSWORD_REPEAT,
      inputPlaceholder: titles.PASSWORD_REPEAT_PLACEHOLDER,
      inputType: inputNames.PASSWORD,
      name: inputNames.PASSWORD_REPEAT,
      validateFunctions: [isPasswordSame],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const aside = new Aside();
    const profileAvatar = new Avatar(profileAvatarOptions);
    const saveButton = new Button(saveButtonOptions);

    const oldPasswordInput = new Input(oldPasswordInputOptions);
    const passwordInput = new Input(newPasswordInputOptions);
    const passwordRepeatInput = new Input(newPasswordRepeatInputOptions);

    const options = {
      lemur: true,
      aside,
      profileAvatar,
      saveButton,
      oldPasswordInput,
      passwordInput,
      passwordRepeatInput,
    };

    super(options, rootId);
  }

  private _enter(event: Event): void {
    event.preventDefault();
    const form = document.forms['changePassword'];

    if (form) {
      const data = getFormData(form);
      console.log('data from form', data);
      const formInputs = [
        (<IChangePasswordPageOptions> this.props).oldPasswordInput,
        (<IChangePasswordPageOptions> this.props).passwordInput,
        (<IChangePasswordPageOptions> this.props).passwordRepeatInput,
      ];

      if (formInputs.reduce((acc, input) => input.validate() && acc, true)) {
        location.href = 'profile.html';
      }
    }
  }

  _onChange(event: Event): void {
    const action = getName(event);

    return (<IChangePasswordPageOptions> this.props)[`${action}Input`]?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value });
  }

  render(): string {
    const template = Handlebars.compile(changePassword);

    return template({
      elementId: this.props.elementId,
      aside: (<IChangePasswordPageOptions> this.props).aside.render(),
      profileAvatar: (<IChangePasswordPageOptions> this.props).profileAvatar.render(),
      saveButton: (<IChangePasswordPageOptions> this.props).saveButton.render(),
      oldPasswordInput: (<IChangePasswordPageOptions> this.props).oldPasswordInput.render(),
      passwordInput: (<IChangePasswordPageOptions> this.props).passwordInput.render(),
      passwordRepeatInput: (<IChangePasswordPageOptions> this.props).passwordRepeatInput.render(),
    });
  }
}

new ChangePassword('change-password');
