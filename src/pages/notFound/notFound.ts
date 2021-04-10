import Handlebars from 'handlebars';

import { IButtonOptions, IErrorPageOptions } from '../../utils/interfaces';
import titles from '../../constants/titles';
import '../../utils/handlebarsHelpers';
import Block from '../../components/block/block';
import Button from '../../components/button/button';
import notFound from './notFound.html';
import './notFound.less';

class NotFound extends Block {
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
    location.href = 'login.html';
  }

  render(): string {
    const template = Handlebars.compile(notFound);

    return template({
      elementId: this.props.elementId,
      returnToChatsButton: (<IErrorPageOptions> this.props).returnToChatsButton.render(),
      titles,
    });
  }
}

new NotFound('not-found');