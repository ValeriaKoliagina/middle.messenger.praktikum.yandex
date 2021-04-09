import Handlebars from 'handlebars';

import { createListener } from '../../utils/utils';
import Avatar from '../avatar/avatar'
import chatListItem from './chatListItem.html';
import './chatListItem.less';

class ChatListItem {
  constructor({ chatName, avatar, lastMessage, lastMessageDate, newMessageCount, selected, clickHandler }) {
    this.chatName = chatName;
    this.avatar = avatar;
    this.lastMessage = lastMessage;
    this.lastMessageDate = lastMessageDate;
    this.newMessageCount = newMessageCount;
    this.className = selected ? ' chat-list-item-selected' : '';

    if (clickHandler) {
      this.clickHandler = clickHandler;
      this.clickHandlerName = createListener(this.clickHandler);
    }

    const profileAvatarOptions = {
      avatarSrc: this.avatar,
      isNoUpload: true,
    }

    this.profileAvatar = (new Avatar(profileAvatarOptions)).render();
  }

  render() {
    const options = {
      chatName: this.chatName,
      avatar: this.avatar,
      lastMessage: this.lastMessage,
      lastMessageDate: this.lastMessageDate,
      newMessageCount: this.newMessageCount,
      profileAvatar: this.profileAvatar,
      selected: this.selected,
      className: this.className,
    }

    if (this.clickHandler) {
      options.clickHandler = `${this.clickHandlerName}()`;
    }

    const template = Handlebars.compile(chatListItem);
    return template(options);
  }
}

export default ChatListItem
