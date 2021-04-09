import Handlebars from 'handlebars';

import titles from '../../constants/titles';
import Button from '../button/button';
import ChatListItem from '../chatListItem/chatListItem'
import Input from '../input/input';
import Modal from '../modal/modal';
import template from './chatList.html';
import chatListMock from './chatsMock';
import './chatList.less';

class ChatList {
  constructor() {
    const closeSettings = () => {
      const settings = document.querySelector('.chats-menu-settings');
      settings?.classList.remove('chats-menu-settings-open');
    }
    
    document.addEventListener('click', closeSettings);

    // buttons
    const settingsButtonOptions = {
      buttonText: titles.SETTINGS_SIGN, 
      buttonClass: 'button-link button-link-without-decoration button-font-primary button-bold',
      clickHandler: e => {
        e.stopPropagation();
        const profileSetting = document.querySelector('.chats-menu-settings');
        profileSetting?.classList.toggle('chats-menu-settings-open');
      },
    }

    const createChatButtonOptions = {
      buttonText: titles.CREATE_CHAT, 
      buttonClass: 'button-alignment-left button-width-content button-font-primary button-bold',
      clickHandler: () => {
        const createChatModal = document.querySelector('#create-chat');
        createChatModal?.classList.add('modal-open');
      },
    }
    
    const profileButtonOptions = {
      buttonText: titles.PROFILE, 
      buttonClass: 'button-link button-font-primary',
      clickHandler: () => location.href = 'profile.html',
    }
    
    const addUserButtonOptions = {
      buttonText: titles.ADD_USER, 
      buttonClass: 'button-link button-font-primary',
      clickHandler: () => {
        const addUserModal = document.querySelector('#add-user');
        addUserModal?.classList.add('modal-open');
      },
    }
    
    const deleteUserButtonOptions = {
      buttonText: titles.DELETE_USER, 
      buttonClass: 'button-link button-font-primary',
      clickHandler: () => {
        const deleteUserModal = document.querySelector('#delete-user');
        deleteUserModal?.classList.add('modal-open');
      },
    }
    
    const deleteChatButtonOptions = {
      buttonText: titles.DELETE_CHAT, 
      buttonClass: 'button-link button-font-primary button-logout',
      clickHandler: () => {
        const deleteChatModal = document.querySelector('#delete-chat');
        deleteChatModal?.classList.add('modal-open');
      },
    }
    
    
    // inputs
    const searchInputOptions = {
      inputPlaceholder: titles.CHAT_SEARCH_PLACEHOLDER,
      name: 'serach',
      inputClass: 'input-long'
    }

    // modal inputs
    const modalInputAddUserOptions = {
      label: titles.LOGIN,
      inputPlaceholder: titles.LOGIN_PLACEHOLDER,
      name: 'user',
      inputId: 'add-user-input',
      changeHandler: e => console.log('Login is:', e.target.value),
    }

    const modalInputDeleteUserOptions = {
      label: titles.LOGIN,
      inputPlaceholder: titles.LOGIN_PLACEHOLDER,
      name: 'user',
      inputId: 'delete-user-input',
      changeHandler: e => console.log('Login is:', e.target.value),
    }

    const modalInputCreateChatOptions = {
      label: titles.CHAT,
      inputPlaceholder: titles.CHAT_PLACEHOLDER,
      name: 'chat',
      inputId: 'create-chat-input',
      changeHandler: e => console.log('Chat is:', e.target.value),
    }

    // modal buttons
    const modalButtonAddUserOptions = {
      buttonText: titles.ADD_USER, 
      clickHandler: () => {
        const addUserInput = document.querySelector('#add-user-input');
        const addUserModal = document.querySelector('#add-user');
        addUserModal?.classList.remove('modal-open');
        if (addUserInput) {
          const { name, value } = addUserInput;
          console.log({[name]: value})
        }
      },
    }

    const modalButtonDeleteUserOptions = {
      buttonText: titles.DELETE_USER, 
      clickHandler: () => {
        const deleteUserInput = document.querySelector('#delete-user-input');
        const addUserModal = document.querySelector('#delete-user');
        addUserModal?.classList.remove('modal-open');
        if (deleteUserInput) {
          const { name, value } = deleteUserInput;
          console.log({[name]: value})
        }
      },
    }

    const modalButtonDeleteChatOptions = {
      buttonText: titles.YES, 
      buttonClass: 'button-link',
      clickHandler: () => {
        const addUserModal = document.querySelector('#delete-chat');
        addUserModal?.classList.remove('modal-open');
      },
    }

    const modalButtonDeleteChatCancelOptions = {
      buttonText: titles.NO, 
      buttonClass: 'button-link button-logout',
      clickHandler: () => {
        const addUserModal = document.querySelector('#delete-chat');
        addUserModal?.classList.remove('modal-open');
      },
    }

    const modalButtonCreateChatOptions = {
      buttonText: titles.CREATE, 
      clickHandler: () => {
        const createChatInput = document.querySelector('#create-chat-input');
        const createChatModal = document.querySelector('#create-chat');
        createChatModal?.classList.remove('modal-open');
        if (createChatInput) {
          const { name, value } = createChatInput
          console.log({[name]: value})
        }
      },
    }
    
    this.modalInputAddUser = (new Input(modalInputAddUserOptions)).render();
    this.modalButtonAddUser = (new Button(modalButtonAddUserOptions)).render();

    this.modalInputDeleteUser = (new Input(modalInputDeleteUserOptions)).render();
    this.modalButtonDeleteUser = (new Button(modalButtonDeleteUserOptions)).render();

    this.modalButtonDeleteChat = (new Button(modalButtonDeleteChatOptions)).render();
    this.modalButtonDeleteChatCancel = (new Button(modalButtonDeleteChatCancelOptions)).render();

    this.modalInputCreateChat = (new Input(modalInputCreateChatOptions)).render();
    this.modalButtonCreateChat = (new Button(modalButtonCreateChatOptions)).render();

    // modals
    const modalWindowAddUserOptions = {
      modalTitle: titles.ADD_USER,
      modalInput: this.modalInputAddUser,
      modalButton: this.modalButtonAddUser,
      id: 'add-user',
    }

    const modalWindowDeleteUserOptions = {
      modalTitle: titles.DELETE_USER,
      modalInput: this.modalInputDeleteUser,
      modalButton: this.modalButtonDeleteUser,
      id: 'delete-user',
    }

    const modalWindowDeleteChatOptions = {
      modalTitle: titles.DELETE_CHAT,
      modalText: titles.DELETE_CHAT_CONFIRMATION,
      modalButton: this.modalButtonDeleteChat,
      modalCancelButton: this.modalButtonDeleteChatCancel,
      id: 'delete-chat',
    }

    const modalWindowCreateChatOptions = {
      modalTitle: titles.NEW_CHAT,
      modalInput: this.modalInputCreateChat,
      modalButton: this.modalButtonCreateChat,
      id: 'create-chat',
    }

    this.settingsButton = (new Button(settingsButtonOptions)).render();
    this.createChatButton = (new Button(createChatButtonOptions)).render();
    this.profileButton = (new Button(profileButtonOptions)).render();
    this.addUserButton = (new Button(addUserButtonOptions)).render();
    this.deleteUserButton = (new Button(deleteUserButtonOptions)).render();
    this.deleteChatButton = (new Button(deleteChatButtonOptions)).render();

    this.chatSearchInput = (new Input(searchInputOptions)).render();
    this.modalWindowAddUser = (new Modal(modalWindowAddUserOptions)).render();
    this.modalWindowDeleteUser = (new Modal(modalWindowDeleteUserOptions)).render();
    this.modalWindowDeleteChat = (new Modal(modalWindowDeleteChatOptions)).render();
    this.modalWindowCreateChat = (new Modal(modalWindowCreateChatOptions)).render();

    this.chatListItems = chatListMock.map(item => (new ChatListItem(item)).render());
  }

  render() {
    const options = {
      createChatButton: this.createChatButton,
      profileButton: this.profileButton,
      addUserButton: this.addUserButton,
      deleteUserButton: this.deleteUserButton,
      deleteChatButton: this.deleteChatButton,
      chatSearchInput: this.chatSearchInput,
      settingsButton: this.settingsButton,
      modalWindowAddUser: this.modalWindowAddUser,
      modalWindowDeleteUser: this.modalWindowDeleteUser,
      modalWindowDeleteChat: this.modalWindowDeleteChat,
      modalWindowCreateChat: this.modalWindowCreateChat,
      chatListItems: this.chatListItems,
      chatListMock,
    }

    const chatListTmpl = Handlebars.compile(template);
    return chatListTmpl(options);
  }
}

export default ChatList
