import Handlebars from 'handlebars';

import { IButtonOptions, IChatListItemOptions, IChatListOptions, IInputOptions, IModalOptions } from '../../utils/interfaces';
import inputNames from '../../constants/inputNames';
import titles from '../../constants/titles';
import { isNotEmpty } from '../../utils/validations';
import Button from '../button/button';
import Block from '../block/block';
import ChatListItem from '../chatListItem/chatListItem';
import Input from '../input/input';
import Modal from '../modal/modal';
import chatList from './chatList.html';
import chatListMock from './chatsMock';
import './chatList.less';

const closeSettings = () => {
  const settings = document.querySelector('.chats-menu-settings');
  settings?.classList.remove('chats-menu-settings-open');
};

document.addEventListener('click', closeSettings);

class ChatList extends Block {
  constructor(rootId?: string) {

    // buttons
    const settingsButtonOptions: IButtonOptions = {
      buttonText: titles.SETTINGS_SIGN,
      buttonClass: 'button-link button-link-without-decoration button-font-primary button-bold',
      events: {click: (event: Event) => {
        event.stopPropagation();
        const profileSetting = document.querySelector('.chats-menu-settings');
        profileSetting?.classList.toggle('chats-menu-settings-open');
      }}
    };

    const createChatButtonOptions: IButtonOptions = {
      buttonText: titles.CREATE_CHAT,
      buttonClass: 'button-alignment-left button-width-content button-font-primary button-bold',
      events: { click: () => {
        const createChatModal = document.querySelector('#create-chat');
        createChatModal?.classList.add('modal-open');
      }}
    };

    const profileButtonOptions: IButtonOptions = {
      buttonText: titles.PROFILE,
      buttonClass: 'button-link button-font-primary',
      events: { click: () => location.href = 'profile.html' }
    };

    const addUserButtonOptions: IButtonOptions = {
      buttonText: titles.ADD_USER,
      buttonClass: 'button-link button-font-primary',
      events: { click: () => {
        const addUserModal = document.querySelector('#add-user');
        addUserModal?.classList.add('modal-open');
      }}
    };

    const deleteUserButtonOptions: IButtonOptions = {
      buttonText: titles.DELETE_USER,
      buttonClass: 'button-link button-font-primary',
      events: { click: () => {
        const deleteUserModal = document.querySelector('#delete-user');
        deleteUserModal?.classList.add('modal-open');
      }}
    };

    const deleteChatButtonOptions: IButtonOptions = {
      buttonText: titles.DELETE_CHAT,
      buttonClass: 'button-link button-font-primary button-logout',
      events: { click: () => {
        const deleteChatModal = document.querySelector('#delete-chat');
        deleteChatModal?.classList.add('modal-open');
      }}
    };

    // inputs
    const searchInputOptions: IInputOptions = {
      inputPlaceholder: titles.CHAT_SEARCH_PLACEHOLDER,
      name: inputNames.SEARCH,
      inputClass: 'input-long',
    };

    // modal inputs
    const modalInputAddUserOptions: IInputOptions = {
      label: titles.LOGIN,
      inputPlaceholder: titles.LOGIN_PLACEHOLDER,
      name: inputNames.USER,
      inputId: 'add-user-input',
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => (<IModalOptions>(<IChatListOptions> this.props).modalWindowAddUser.props).modalInput?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value })}
    };

    const modalInputDeleteUserOptions: IInputOptions = {
      label: titles.LOGIN,
      inputPlaceholder: titles.LOGIN_PLACEHOLDER,
      name: inputNames.USER,
      inputId: 'delete-user-input',
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => (<IModalOptions>(<IChatListOptions> this.props).modalWindowDeleteUser.props).modalInput?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value })}
    };

    const modalInputCreateChatOptions: IInputOptions = {
      label: titles.CHAT,
      inputPlaceholder: titles.CHAT_PLACEHOLDER,
      name: inputNames.CHAT_NAME,
      inputId: 'create-chat-input',
      validateFunctions: [isNotEmpty],
      events: { change: (event: Event) => (<IModalOptions>(<IChatListOptions> this.props).modalWindowCreateChat.props).modalInput?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value })}
    };

    // modal buttons
    const modalButtonAddUserOptions: IButtonOptions = {
      buttonText: titles.ADD_USER,
      events: { click: () => {
        const addUserInput = document.querySelector('#add-user-input');
        if (addUserInput && (<Input>(<IModalOptions>(<IChatListOptions> this.props).modalWindowAddUser.props).modalInput).validate()) {
          const addUserModal = document.querySelector('#add-user');
          addUserModal?.classList.remove('modal-open');
        }
      }}
    };

    const modalButtonDeleteUserOptions: IButtonOptions = {
      buttonText: titles.DELETE_USER,
      events: { click: () => {
        const deleteUserInput = document.querySelector('#delete-user-input');
        if (deleteUserInput && (<Input>(<IModalOptions>(<IChatListOptions> this.props).modalWindowDeleteUser.props).modalInput).validate()) {
          const addUserModal = document.querySelector('#delete-user');
          addUserModal?.classList.remove('modal-open');
        }
      }}
    };

    const modalButtonDeleteChatOptions: IButtonOptions = {
      buttonText: titles.YES,
      buttonClass: 'button-link',
      events: { click: () => {
        const addUserModal = document.querySelector('#delete-chat');
        addUserModal?.classList.remove('modal-open');
      }}
    };

    const modalButtonDeleteChatCancelOptions: IButtonOptions = {
      buttonText: titles.NO,
      buttonClass: 'button-link button-logout',
      events: { click: () => {
        const addUserModal = document.querySelector('#delete-chat');
        addUserModal?.classList.remove('modal-open');
      }}
    };

    const modalButtonCreateChatOptions: IButtonOptions = {
      buttonText: titles.CREATE,
      events: { click: () => {
        const createChatInput = document.querySelector('#create-chat-input');
        if (createChatInput && (<Input>(<IModalOptions>(<IChatListOptions> this.props).modalWindowCreateChat.props).modalInput).validate()) {
          const createChatModal = document.querySelector('#create-chat');
          createChatModal?.classList.remove('modal-open');
        }
      }}
    };

    const modalInputAddUser = new Input(modalInputAddUserOptions);
    const modalButtonAddUser = new Button(modalButtonAddUserOptions);

    const modalInputDeleteUser = new Input(modalInputDeleteUserOptions);
    const modalButtonDeleteUser = new Button(modalButtonDeleteUserOptions);

    const modalButtonDeleteChat = new Button(modalButtonDeleteChatOptions);
    const modalButtonDeleteChatCancel = new Button(modalButtonDeleteChatCancelOptions);

    const modalInputCreateChat = new Input(modalInputCreateChatOptions);
    const modalButtonCreateChat = new Button(modalButtonCreateChatOptions);

    // modals
    const modalWindowAddUserOptions: IModalOptions = {
      modalTitle: titles.ADD_USER,
      modalInput: modalInputAddUser,
      modalButton: modalButtonAddUser,
      elementId: 'add-user',
    };

    const modalWindowDeleteUserOptions: IModalOptions = {
      modalTitle: titles.DELETE_USER,
      modalInput: modalInputDeleteUser,
      modalButton: modalButtonDeleteUser,
      elementId: 'delete-user',
    };

    const modalWindowDeleteChatOptions: IModalOptions = {
      modalTitle: titles.DELETE_CHAT,
      modalText: titles.DELETE_CHAT_CONFIRMATION,
      modalButton: modalButtonDeleteChat,
      modalCancelButton: modalButtonDeleteChatCancel,
      elementId: 'delete-chat',
    };

    const modalWindowCreateChatOptions: IModalOptions = {
      modalTitle: titles.NEW_CHAT,
      modalInput: modalInputCreateChat,
      modalButton: modalButtonCreateChat,
      elementId: 'create-chat',
    };

    const settingsButton = new Button(settingsButtonOptions);
    const createChatButton = new Button(createChatButtonOptions);
    const profileButton = new Button(profileButtonOptions);
    const addUserButton = new Button(addUserButtonOptions);
    const deleteUserButton = new Button(deleteUserButtonOptions);
    const deleteChatButton = new Button(deleteChatButtonOptions);

    const chatSearchInput = new Input(searchInputOptions);
    const modalWindowAddUser = new Modal(modalWindowAddUserOptions);
    const modalWindowDeleteUser = new Modal(modalWindowDeleteUserOptions);
    const modalWindowDeleteChat = new Modal(modalWindowDeleteChatOptions);
    const modalWindowCreateChat = new Modal(modalWindowCreateChatOptions);
    const chatListItems = chatListMock.map(item => new ChatListItem(<IChatListItemOptions>item));

    const options = {
      lemur: true,
      settingsButton,
      createChatButton,
      profileButton,
      addUserButton,
      deleteUserButton,
      deleteChatButton,
      chatSearchInput,
      modalWindowAddUser,
      modalWindowDeleteUser,
      modalWindowDeleteChat,
      modalWindowCreateChat,
      chatListItems,
    };

    super(options, rootId);
  }

  render(): string {
    const template = Handlebars.compile(chatList);

    return template({
      elementId: this.props.elementId,
      createChatButton: (<IChatListOptions> this.props).createChatButton.render(),
      profileButton: (<IChatListOptions> this.props).profileButton.render(),
      addUserButton: (<IChatListOptions> this.props).addUserButton.render(),
      deleteUserButton: (<IChatListOptions> this.props).deleteUserButton.render(),
      deleteChatButton: (<IChatListOptions> this.props).deleteChatButton.render(),
      chatSearchInput: (<IChatListOptions> this.props).chatSearchInput.render(),
      settingsButton: (<IChatListOptions> this.props).settingsButton.render(),
      modalWindowAddUser: (<IChatListOptions> this.props).modalWindowAddUser.render(),
      modalWindowDeleteUser: (<IChatListOptions> this.props).modalWindowDeleteUser.render(),
      modalWindowDeleteChat: (<IChatListOptions> this.props).modalWindowDeleteChat.render(),
      modalWindowCreateChat: (<IChatListOptions> this.props).modalWindowCreateChat.render(),
      chatListItems: (<IChatListOptions> this.props).chatListItems.map((item: ChatListItem) => item.render()),
      chatListMock,
    });
  }
}

export default ChatList;
