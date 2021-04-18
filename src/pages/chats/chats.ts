import Handlebars from 'handlebars';

import { IChatsPageOptions } from '../../utils/interfaces';
import titles from '../../constants/titles';
import Block from '../../components/block/block';
import ChatList from '../../components/chatList/chatList';
import chats from './chats.html';
import './chats.less';

class Chats extends Block {
  constructor(rootId: string) {
    const chatListComponent = new ChatList();

    const options = {
      lemur: true,
      chatListComponent,
    };

    super(options, rootId);
  }

  render(): string {
    const template = Handlebars.compile(chats);

    return template({
      elementId: this.props.elementId,
      chatListComponent: (<IChatsPageOptions> this.props).chatListComponent.render(),
      titles,
    });
  }
}

new Chats('chats');
