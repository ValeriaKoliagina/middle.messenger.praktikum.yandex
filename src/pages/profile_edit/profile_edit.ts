import Handlebars from 'handlebars';

import { IAvatarOptions, IButtonOptions, IInputOptions, IProfileEditPageOptions } from '../../utils/interfaces';
import inputNames from '../../constants/inputNames';
import { getFormData, getName } from '../../utils/utils';
import { isEmail, isNotEmpty, isPhone } from '../../utils/validations';
import titles from '../../constants/titles';
import Aside from '../../components/aside/aside';
import Block from '../../components/block/block';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import profileInfo from '../profile/profileMock';
import profileEdit from './profile_edit.html';
import './profile_edit.less';

class ProfileEdit extends Block {
  constructor(rootId: string) {

    // avatar
    const profileAvatarOptions: IAvatarOptions = {
      avatarSrc: profileInfo.src,
      avatarClass: 'avatar-big avatar-disabled',
    };

    // button
    const saveButtonOptions: IButtonOptions = {
      buttonText: titles.SAVE,
      buttonType: 'submit',
      events: { click: (event: Event) => this._enter(event) }
    };

    // inputs
    const emailInputOptions: IInputOptions = {
      label: titles.EMAIL,
      inputPlaceholder: titles.EMAIL_PLACEHOLDER,
      info: profileInfo.email,
      inputType: inputNames.EMAIL,
      name: inputNames.EMAIL,
      validateFunctions: [isEmail],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const loginInputOptions: IInputOptions = {
      label: titles.LOGIN,
      inputPlaceholder: titles.LOGIN_PLACEHOLDER,
      info: profileInfo.login,
      name: inputNames.LOGIN,
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const nameInputOptions: IInputOptions = {
      label: titles.NAME,
      inputPlaceholder: titles.NAME_PLACEHOLDER,
      info: profileInfo.name,
      name: inputNames.NAME,
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const surnameInputOptions: IInputOptions = {
      label: titles.SURNAME,
      inputPlaceholder: titles.SURNAME_PLACEHOLDER,
      info: profileInfo.surname,
      name: inputNames.SURNAME,
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const chatNameInputOptions: IInputOptions = {
      label: titles.CHAT_NAME,
      inputPlaceholder: titles.CHAT_NAME_PLACEHOLDER,
      info: profileInfo.chatName,
      name: inputNames.CHAT_NAME,
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const phoneInputOptions: IInputOptions = {
      label: titles.PHONE,
      inputPlaceholder: titles.PHONE_PLACEHOLDER,
      info: profileInfo.phone,
      name: inputNames.PHONE,
      validateFunctions: [isPhone],
      events: { change: (event: Event) => this._onChange(event) }
    };

    const aside = new Aside();
    const profileAvatar = new Avatar(profileAvatarOptions);
    const saveButton = new Button(saveButtonOptions);

    const emailInput = new Input(emailInputOptions);
    const loginInput = new Input(loginInputOptions);
    const nameInput = new Input(nameInputOptions);
    const surnameInput = new Input(surnameInputOptions);
    const chatNameInput = new Input(chatNameInputOptions);
    const phoneInput = new Input(phoneInputOptions);

    const options = {
      lemur: true,
      aside,
      profileAvatar,
      saveButton,
      emailInput,
      loginInput,
      nameInput,
      surnameInput,
      chatNameInput,
      phoneInput,
    };

    super(options, rootId);
  }

  private _enter(event: Event): void {
    event.preventDefault();
    const form = document.forms['personInfo'];

    if (form) {
      const data = getFormData(form);
      console.log('data from form', data);
      const formInputs = [
        (<IProfileEditPageOptions> this.props).loginInput,
        (<IProfileEditPageOptions> this.props).emailInput,
        (<IProfileEditPageOptions> this.props).nameInput,
        (<IProfileEditPageOptions> this.props).surnameInput,
        (<IProfileEditPageOptions> this.props).chatNameInput,
        (<IProfileEditPageOptions> this.props).phoneInput
      ];

      if (formInputs.reduce((acc, input) => input.validate() && acc, true)) {
        location.href = 'profile.html';
      }
    }
  }

  _onChange(event: Event): void {
    const name = getName(event);

    return (<IProfileEditPageOptions> this.props)[`${name}Input`]?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value });
  }

  render(): string {
    const template = Handlebars.compile(profileEdit);

    return template({
      elementId: this.props.elementId,
      aside: (<IProfileEditPageOptions> this.props).aside.render(),
      profileAvatar: (<IProfileEditPageOptions> this.props).profileAvatar.render(),
      saveButton: (<IProfileEditPageOptions> this.props).saveButton.render(),
      emailInput: (<IProfileEditPageOptions> this.props).emailInput.render(),
      loginInput: (<IProfileEditPageOptions> this.props).loginInput.render(),
      nameInput: (<IProfileEditPageOptions> this.props).nameInput.render(),
      surnameInput: (<IProfileEditPageOptions> this.props).surnameInput.render(),
      chatNameInput: (<IProfileEditPageOptions> this.props).chatNameInput.render(),
      phoneInput: (<IProfileEditPageOptions> this.props).phoneInput.render(),
    });
  }
}

new ProfileEdit('profile-edit');