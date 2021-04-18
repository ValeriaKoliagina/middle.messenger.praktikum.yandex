import Handlebars from 'handlebars';

import inputNames from '../../constants/inputNames';
import redirections from '../../constants/redirections';
import titles from '../../constants/titles';
import { IButtonOptions, IInputOptions, ISignupPageOptions } from '../../utils/interfaces';
import { getFormData, getName } from '../../utils/utils';
import { isEmail, isNotEmpty, isPassword, isPasswordSame } from '../../utils/validations';
import Block from '../../components/block/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import signup from './signup.html';
import '../login/login.less';

class Signup extends Block {
  constructor(rootId: string) {

    // buttons
    const signupButtonOptions: IButtonOptions = {
      buttonText: titles.SIGNUP,
      buttonType: 'submit',
    };

    const rememberAllButtonOptions: IButtonOptions = {
      buttonText: titles.REMEMBER_ALL,
      buttonClass: 'button-link',
      events: { click: () => this._redirect() }
    };

    // inputs
    const emailInputOptions: IInputOptions = {
      label: titles.EMAIL,
      inputPlaceholder: titles.EMAIL_PLACEHOLDER,
      inputType: inputNames.EMAIL,
      name: inputNames.EMAIL,
      validateFunctions: [isEmail],
      events: {
        change: (event: Event) => this._onChange(event),
        keydown: (event: KeyboardEvent) => this._onKeyDown(event),
      }
    };

    const loginInputOptions: IInputOptions = {
      label: titles.LOGIN,
      inputPlaceholder: titles.LOGIN_PLACEHOLDER,
      name: inputNames.LOGIN,
      validateFunctions: [isNotEmpty],
      events: {
        change: (event: Event) => this._onChange(event),
        keydown: (event: KeyboardEvent) => this._onKeyDown(event),
      }
    };

    const nameInputOptions: IInputOptions = {
      label: titles.NAME,
      inputPlaceholder: titles.NAME_PLACEHOLDER,
      name: inputNames.NAME,
      validateFunctions: [isNotEmpty],
      events: {
        change: (event: Event) => this._onChange(event),
        keydown: (event: KeyboardEvent) => this._onKeyDown(event),
      }
    };

    const surnameInputOptions: IInputOptions = {
      label: titles.SURNAME,
      inputPlaceholder: titles.SURNAME_PLACEHOLDER,
      name: inputNames.SURNAME,
      validateFunctions: [isNotEmpty],
      events: {
        change: (event: Event) => this._onChange(event),
        keydown: (event: KeyboardEvent) => this._onKeyDown(event),
      }
    };

    const passwordInputOptions: IInputOptions = {
      label: titles.PASSWORD,
      inputPlaceholder: titles.PASSWORD_PLACEHOLDER,
      inputType: inputNames.PASSWORD,
      name: inputNames.PASSWORD,
      validateFunctions: [isPassword],
      events: {
        change: (event: Event) => this._onChange(event),
        keydown: (event: KeyboardEvent) => this._onKeyDown(event),
      }
    };

    const passwordRepeatInputOptions: IInputOptions = {
      label: titles.PASSWORD_REPEAT,
      inputPlaceholder: titles.PASSWORD_REPEAT_PLACEHOLDER,
      inputType: inputNames.PASSWORD,
      name: inputNames.PASSWORD_REPEAT,
      validateFunctions: [isPasswordSame],
      events: {
        change: (event: Event) => this._onChange(event),
        keydown: (event: KeyboardEvent) => this._onKeyDown(event),
      }
    };

    const signupButton = new Button(signupButtonOptions);
    const rememberAllButton = new Button(rememberAllButtonOptions);

    const emailInput = new Input(emailInputOptions);
    const loginInput = new Input(loginInputOptions);
    const nameInput = new Input(nameInputOptions);
    const surnameInput = new Input(surnameInputOptions);
    const passwordInput = new Input(passwordInputOptions);
    const passwordRepeatInput = new Input(passwordRepeatInputOptions);

    const options = {
      lemur: true,
      signupButton,
      rememberAllButton,
      emailInput,
      loginInput,
      nameInput,
      surnameInput,
      passwordInput,
      passwordRepeatInput,
      submitFormHandler: (event: Event) => this._enter(event),
    };

    super(options, rootId);
  }

  private _enter(event: Event): void {
    event.preventDefault();
    const form = document.forms.namedItem('signup');

    if (form) {
      const data = getFormData(form);
      console.log('data from form', data, event);
      const formInputs = [
        (<ISignupPageOptions> this.props).loginInput,
        (<ISignupPageOptions> this.props).emailInput,
        (<ISignupPageOptions> this.props).nameInput,
        (<ISignupPageOptions> this.props).surnameInput,
        (<ISignupPageOptions> this.props).passwordInput,
        (<ISignupPageOptions> this.props).passwordRepeatInput
      ];

      if (formInputs.reduce((acc, input) => input.validate() && acc, true)
      ) {
        location.href = redirections.CHATS;
      }
    }
  }

  private _redirect(): void {
    location.href = redirections.LOGOUT;
  }

  _onChange(event: Event): void {
    const name = getName(event);

    return (this.props as {[key:string] : Block})[`${name}Input`]?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value });
  }

  _onKeyDown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this._onChange(event);
      this._enter(event);
    }
  }

  render(): string {
    const template = Handlebars.compile(signup);

    return template({
      elementId: this.props.elementId,
      signupButton: (<ISignupPageOptions> this.props).signupButton.render(),
      rememberAllButton: (<ISignupPageOptions> this.props).rememberAllButton.render(),
      emailInput: (<ISignupPageOptions> this.props).emailInput.render(),
      loginInput: (<ISignupPageOptions> this.props).loginInput.render(),
      nameInput: (<ISignupPageOptions> this.props).nameInput.render(),
      surnameInput: (<ISignupPageOptions> this.props).surnameInput.render(),
      passwordInput: (<ISignupPageOptions> this.props).passwordInput.render(),
      passwordRepeatInput: (<ISignupPageOptions> this.props).passwordRepeatInput.render(),
      titles,
    });
  }
}

new Signup('signup');
