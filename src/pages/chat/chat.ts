import Handlebars from 'handlebars';

import inputNames from '../../constants/inputNames';
import titles from '../../constants/titles';
import '../../utils/handlebarsHelpers';
import { IAvatarOptions, IButtonOptions, IChatPageOptions, IInputOptions, IModalOptions } from '../../utils/interfaces';
import { isNotEmpty } from '../../utils/validations';
import Avatar from '../../components/avatar/avatar';
import Block from '../../components/block/block';
import Button from '../../components/button/button';
import ChatList from '../../components/chatList/chatList';
import Input from '../../components/input/input';
import Modal from '../../components/modal/modal';
import chatMock from './chatMock';
import chat from './chat.html';
import './chat.less';

const closeMenu = () => {
  const settings = document.querySelector('.chat-footer-menu');
  settings?.classList.remove('chat-footer-menu-open');
};

document.addEventListener('click', closeMenu);

const onAttachClickHandler = (event: Event) => {
  event.stopPropagation();
  const attach = document.querySelector('.chat-footer-menu');
  attach?.classList.toggle('chat-footer-menu-open');
};

class Chat extends Block {
  constructor(rootId: string) {

    const profileAvatarOptions: IAvatarOptions = {
      avatarSrc: '/assets/photoMenuIcon.svg',
      avatarClass: 'chat-header-avatar',
    };

    const chatInputOptions: IInputOptions = {
      inputClass: 'input-long',
      inputPlaceholder: titles.MESSAGE,
      error: 'no',
      validateFunctions: [],
      events: {
        change: (event: Event): void => {
          (<IChatPageOptions> this.props).chatInput.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value });
        },
        keydown: (event: KeyboardEvent): void => {
          if (event.code === 'Enter') {
            (<HTMLElement>document.querySelector('#send-message-button'))!.click();
            (<IChatPageOptions> this.props).chatInput.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value });
            (<IChatPageOptions> this.props).chatInput.setProps(<IInputOptions>{ info: ''});
          }
        }
      }
    };

    const chatNameButtonOptions: IButtonOptions = {
      buttonText: chatMock.chatName,
      buttonClass: 'button-link button-font-primary button-bold button-link-without-decoration chat-header-name',
      events: { click: () => {
        const chatNameModal = document.querySelector('#rename-chat');
        chatNameModal?.classList.add('modal-open');
      }}
    };

    const submitButtonOptions: IButtonOptions = {
      buttonImg: '/assets/submit.svg',
      buttonClass: 'button-round',
      elementId: 'send-message-button',
      events: {
        click: () => {
          (<IChatPageOptions> this.props).chatInput.setProps(<IInputOptions>{ info: ''});
          console.log('send message');
        },
      }
    };

    const modalInputRenameChatOptions: IInputOptions = {
      label: titles.CHAT,
      inputPlaceholder: titles.CHAT_PLACEHOLDER,
      name: inputNames.CHAT_NAME,
      inputId: 'rename-chat-input',
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => ((<IModalOptions>(<IChatPageOptions> this.props).modalWindowRenameChat.props).modalInput)?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value }) }
    };

    const modalButtonRenameChatOptions: IButtonOptions = {
      buttonText: titles.RENAME,
      events: { click: () => {
        const renameChatInput = document.querySelector('#rename-chat-input');
        if (renameChatInput && (<Input>(<IModalOptions>(<IChatPageOptions> this.props).modalWindowRenameChat.props).modalInput).validate()) {
          const renameChatModal = document.querySelector('#rename-chat');
          renameChatModal?.classList.remove('modal-open');
        }
      }}
    };

    const modalInputRenameChat = new Input(modalInputRenameChatOptions);
    const modalButtonRenameChat = new Button(modalButtonRenameChatOptions);

    const modalWindowRenameChatOptions: IModalOptions = {
      modalTitle: titles.RENAME_CHAT,
      modalInput: modalInputRenameChat,
      modalButton: modalButtonRenameChat,
      elementId: 'rename-chat',
    };

    const profileAvatar = new Avatar(profileAvatarOptions);
    const chatInput = new Input(chatInputOptions);
    const submitButton = new Button(submitButtonOptions);
    const chatNameButton = new Button(chatNameButtonOptions);
    const modalWindowRenameChat = new Modal(modalWindowRenameChatOptions);
    const chatListComponent = new ChatList();

    const options = {
      lemur: true,
      profileAvatar,
      chatInput,
      submitButton,
      chatNameButton,
      modalWindowRenameChat,
      chatListComponent,
    };

    super(options, rootId);
  }

  render(): string {
    const template = Handlebars.compile(chat);

    return template({
      elementId: this.props.elementId,
      profileAvatar: (<IChatPageOptions> this.props).profileAvatar.render(),
      chatInput: (<IChatPageOptions> this.props).chatInput.render(),
      submitButton: (<IChatPageOptions> this.props).submitButton.render(),
      chatNameButton: (<IChatPageOptions> this.props).chatNameButton.render(),
      modalWindowRenameChat: (<IChatPageOptions> this.props).modalWindowRenameChat.render(),
      chatListComponent: (<IChatPageOptions> this.props).chatListComponent.render(),
      attachImg: '/assets/paperclip.svg',
      submitImg: '/assets/submit.svg',
      photoImg: '/assets/photoMenuIcon.svg',
      fileImg: '/assets/fileMenuIcon.svg',
      locationImg: '/assets/locationMenuIcon.svg',
      titles,
      chatMock,
    });
  }
}

new Chat('chat');

const attachElement = document.querySelector('.chat-footer-attach');
attachElement?.addEventListener('click', onAttachClickHandler);

const settings = document.querySelector('.chat-footer-menu');
settings?.addEventListener('click', event => event.stopPropagation());
