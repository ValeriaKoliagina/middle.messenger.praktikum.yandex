import Handlebars from 'handlebars';

import { IAsideOptions, IButtonOptions } from '../../utils/interfaces';
import Block from '../block/block';
import Button from '../button/button';
import aside from './aside.html';
import './aside.less';

class Aside extends Block {
  constructor() {
    const backButtonOptions: IButtonOptions = {
      buttonImg: '/assets/submit.svg',
      buttonClass: 'button-round button-transform',
      events: { click: () => this._redirect() }
    };

    const backButton = new Button(backButtonOptions);
    const options = {
      lemur: true,
      backButton,
    };

    super(options);
  }

  private _redirect(): void {
    window.history.back();
  }

  render(): string {
    const template = Handlebars.compile(aside);

    return template({
      elementId: this.props.elementId,
      backButton: (<IAsideOptions> this.props).backButton.render(),
    });
  }
}

export default Aside;
