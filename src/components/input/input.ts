import Handlebars from 'handlebars';

import { generateRandomString } from '../../utils/utils';
import { IInputOptions } from '../../utils/interfaces';
import Block from '../block/block';
import input from './input.html';
import './input.less';

class Input extends Block {
  constructor(options: IInputOptions, rootId?: string) {
    options.inputClass = options.inputClass ? ` ${options.inputClass}` : '';
    options.inputId = options.inputId || generateRandomString();
    options.inputType = options.inputType || 'text';
    options.validateFunctions = options.validateFunctions || [];
    options.error = typeof options.error === 'string' ? !options.error?.length : true;

    super(options, rootId);
  }

  validate(): boolean {
    let errorMessage = '';
    for (const func of (<IInputOptions> this.props).validateFunctions) {
      if (typeof func === 'function') {
        errorMessage = func((<IInputOptions> this.props).info?.trim());
        break;
      }
    }

    this.setProps(<IInputOptions>{ errorMessage });

    return !errorMessage;
  }

  detachListeners(): void {
    const rootElement = document.querySelector(`#${(<IInputOptions> this.props).inputId}`);

    if (this.props.events && rootElement) {
      Object.keys(this.props.events).forEach(key => {
        this.props.events && rootElement.removeEventListener(key, this.props.events[key]);
      });
    }
  }

  attachListeners(): void {
    const rootElement = document.querySelector(`#${(<IInputOptions> this.props).inputId}`);

    if (this.props.events && rootElement) {
      Object.keys(this.props.events).forEach(key => {
        this.props.events && rootElement.addEventListener(key, this.props.events[key]);
      });
    }
  }

  componentDidUpdate(oldProps: IInputOptions, newProps: IInputOptions): boolean {
    if (oldProps.info !== newProps.info) {
      this.validate();
    }

    return true;
  }

  render(): string {
    const template = Handlebars.compile(input);

    return template(this.props);
  }
}

export default Input;
