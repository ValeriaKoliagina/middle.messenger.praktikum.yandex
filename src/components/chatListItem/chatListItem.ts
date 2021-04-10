import Handlebars from 'handlebars';

import { IAvatarOptions, IChatListItemOptions } from '../../utils/interfaces';
import Block from '../block/block';
import Avatar from '../avatar/avatar';
import chatListItem from './chatListItem.html';
import './chatListItem.less';

class ChatListItem extends Block {
  constructor(options: IChatListItemOptions, rootId?: string) {
    options.className = options.selected ? ' chat-list-item-selected' : '';

    const profileAvatarOptions: IAvatarOptions = {
      avatarSrc: options.avatar,
      isNoUpload: true,
    };
    const profileAvatar = new Avatar(profileAvatarOptions);

    options.profileAvatar = profileAvatar;
    options.events = { click: () => this._redirect() };

    super(options, rootId);
  }

  private _redirect(): void {
    location.href = 'chat.html';
  }

  render(): string {
    const template = Handlebars.compile(chatListItem);

    return template({
      ...this.props,
      profileAvatar: (<IChatListItemOptions> this.props).profileAvatar.render()
    });
  }
}

export default ChatListItem;