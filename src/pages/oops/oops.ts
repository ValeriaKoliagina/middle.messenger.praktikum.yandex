import Handlebars from 'handlebars';

import redirections from '../../constants/redirections';
import titles from '../../constants/titles';
import '../../utils/handlebarsHelpers';
import { IButtonOptions, IErrorPageOptions } from '../../utils/interfaces';
import Block from '../../components/block/block';
import Button from '../../components/button/button';
import oops from './oops.html';
import './oops.less';

class Oops extends Block {
  constructor(rootId: string) {

    const returnToChatsButtonOptions: IButtonOptions = {
      buttonText: titles.RETURN_TO_CHATS,
      buttonClass: 'button-big',
      events: { click: () => this._redirect() }
    };

    const returnToChatsButton = new Button(returnToChatsButtonOptions);

    const options = {
      lemur: true,
      returnToChatsButton,
    };

    super(options, rootId);
  }

  private _redirect(): void {
    location.href = redirections.LOGOUT;
  }

  render(): string {
    const template = Handlebars.compile(oops);

    return template({
      elementId: this.props.elementId,
      returnToChatsButton: (<IErrorPageOptions> this.props).returnToChatsButton.render(),
      titles,
    });
  }
}

new Oops('oops');
