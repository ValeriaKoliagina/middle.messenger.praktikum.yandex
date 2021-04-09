import Handlebars from 'handlebars';

import '../../utils/handlebarsHelpers'
import { createListener } from '../../utils/utils';
import button from './button.html';
import './button.less';

class Button {
  constructor({ buttonText, buttonClass, buttonType = 'button', clickHandler, buttonImg }) {
    this.buttonText = buttonText;
    this.buttonClass = buttonClass ? ` ${buttonClass}` : '';
    this.buttonType = buttonType;
    this.buttonImg = buttonImg;

    if (clickHandler) {
      this.clickHandler = clickHandler;
      this.clickHandlerName = createListener(this.clickHandler);
    }
  }

  render() {
    const options = {
      buttonText: this.buttonText,
      buttonClass: this.buttonClass,
      buttonType: this.buttonType,
      buttonImg: this.buttonImg,
    }

    if (this.clickHandler) {
      options.clickHandler = `${this.clickHandlerName}(event)`;
    }

    const template = Handlebars.compile(button);
    return template(options);
  }
}

export default Button
