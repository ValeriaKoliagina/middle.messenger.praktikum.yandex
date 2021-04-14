import Handlebars from 'handlebars';

import { IButtonOptions, IInputOptions, ILoginPageOptions } from '../../utils/interfaces';
import { getFormData, getName } from '../../utils/utils';
import { isNotEmpty, isPassword } from '../../utils/validations';
import inputNames from '../../constants/inputNames';
import redirections from '../../constants/redirections';
import titles from '../../constants/titles';
import Block from '../../components/block/block';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import login from './login.html';
import './login.less';

class Login extends Block {
  constructor(rootId: string) {

    // buttons
    const loginButtonOptions: IButtonOptions = {
      buttonText: titles.ENTER,
      buttonType: 'submit',
    };

    const registerButtonOptions: IButtonOptions = {
      buttonText: titles.LINK_TO_SIGN_UP,
      buttonClass: 'button-link',
      events: {
        click: () => this._redirect()
      }
    };

    // inputs
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

    const loginButton = new Button(loginButtonOptions);
    const registerButton = new Button(registerButtonOptions);
    const loginInput = new Input(loginInputOptions);
    const passwordInput = new Input(passwordInputOptions);
    const options = {
      lemur: true,
      loginButton,
      registerButton,
      loginInput,
      passwordInput,
      submitFormHandler: (event: Event) => this._enter(event),
    };
    super(options, rootId);
  }

  private _enter(event: Event): void {
    event.preventDefault();
    const form = document.forms.namedItem('login');

    if (form) {
      const data = getFormData(form);
      console.log('data from form', data);

      if ((<ILoginPageOptions> this.props).loginInput.validate() && (<ILoginPageOptions> this.props).passwordInput.validate()) {
        location.href = redirections.CHATS;
      }
    }
  }

  private _redirect(): void {
    location.href = redirections.SIGNUP;
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
    const template = Handlebars.compile(login);

    return template({
      elementId: this.props.elementId,
      loginButton: (<ILoginPageOptions> this.props).loginButton.render(),
      registerButton: (<ILoginPageOptions> this.props).registerButton.render(),
      loginInput: (<ILoginPageOptions> this.props).loginInput.render(),
      passwordInput: (<ILoginPageOptions> this.props).passwordInput.render(),
      titles,
    });
  }
}

new Login('root');
