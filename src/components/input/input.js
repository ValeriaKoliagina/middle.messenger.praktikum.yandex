import Handlebars from 'handlebars';

import { createListener, generateRandomString } from '../../utils/utils';
import input from './input.html';
import './input.less';

class Input {
  constructor({ 
    inputId, 
    label, 
    inputType = 'text',
    inputClass,
    clickHandler,
    changeHandler,
    inputPlaceholder,
    info,
    name,
    errorMessage,
    error,
  }) {
    this.inputId = inputId || generateRandomString();
    this.label = label;
    this.inputClass = inputClass ? ` ${inputClass}` : '';
    this.inputPlaceholder = inputPlaceholder;
    this.errorMessage = errorMessage;
    this.info = info;
    this.name = name;
    this.error = !error?.length;
    this.inputType = inputType;

    if (clickHandler) {
      this.clickHandler = clickHandler;
      this.clickHandlerName = createListener(this.clickHandler);
    }

    if (changeHandler) {
      this.changeHandler = changeHandler;
      this.changeHandlerName = createListener(this.changeHandler);
    }
  }

  render() {
    const options = {
      inputId: this.inputId,
      label: this.label,
      inputClass: this.inputClass,
      inputPlaceholder: this.inputPlaceholder,
      info: this.info,
      name: this.name,
      inputType: this.inputType,
      errorMessage: this.errorMessage,
      error: this.error,
    }

    if (this.clickHandler) {
      options.clickHandler = `${this.clickHandlerName}(event)`;
    }

    if (this.changeHandler) {
      options.changeHandler = `${this.changeHandlerName}(event)`;
    }

    const template = Handlebars.compile(input);
    return template(options);
  }
}

export default Input
