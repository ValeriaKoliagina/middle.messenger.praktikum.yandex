import Handlebars from 'handlebars';

import chatMock from './chatMock';

import '../../utils/handlebarsHelpers';
import titles from '../../constants/titles';
import Avatar from '../../components/avatar/avatar';
import Button from '../../components/button/button';
import ChatList from '../../components/chatList/chatList';
import Input from '../../components/input/input';
import Modal from '../../components/modal/modal';
import template from './chat.html';
import './chat.less';

const closeMenu = () => {
  const settings = document.querySelector('.chat-footer-menu');
  settings?.classList.remove('chat-footer-menu-open');
}

document.addEventListener('click', closeMenu);

const onAttachClickHandler = event => {
  event.stopPropagation();
  const attach = document.querySelector('.chat-footer-menu');
  attach?.classList.toggle('chat-footer-menu-open');
}

const profileAvatarOptions = {
  avatarSrc: '/assets/photoMenuIcon.svg',
  avatarClass: 'chat-header-avatar',
}

const chatInputOptions = {
  inputClass: 'input-long',
  inputPlaceholder: titles.MESSAGE,
  error: 'no',
}

const chatNameButtonOptions = {
  buttonText: chatMock.chatName, 
  buttonClass: 'button-link button-font-primary button-bold button-link-without-decoration chat-header-name',
  clickHandler: () => {
    const chatNameModal = document.querySelector('#rename-chat');
    chatNameModal?.classList.add('modal-open');
  },
}

const submitButtonOptions = {
  buttonImg: '/assets/submit.svg',
  buttonClass: 'button-round',
  clickHandler: () => console.log('send message'),
}

const modalInputRenameChatOptions = {
  label: titles.CHAT,
  inputPlaceholder: titles.CHAT_PLACEHOLDER,
  name: 'chat',
  inputId: 'rename-chat-input',
  changeHandler: e => console.log('Chat is:', e.target.value),
}

const modalButtonRenameChatOptions = {
  buttonText: titles.RENAME, 
  clickHandler: () => {
    const renameChatInput = document.querySelector('#rename-chat-input');
    const renameChatModal = document.querySelector('#rename-chat');
    renameChatModal?.classList.remove('modal-open');
    if (renameChatInput) {
      const { name, value } = renameChatInput
      console.log({[name]: value})
    }
  },
}

const modalInputRenameChat = (new Input(modalInputRenameChatOptions)).render();
const modalButtonRenameChat = (new Button(modalButtonRenameChatOptions)).render();

const modalWindowRenameChatOptions = {
  modalTitle: titles.RENAME_CHAT,
  modalInput: modalInputRenameChat,
  modalButton: modalButtonRenameChat,
  id: 'rename-chat',
}

const profileAvatar = (new Avatar(profileAvatarOptions)).render();
const chatInput = (new Input(chatInputOptions)).render();
const submitButton = (new Button(submitButtonOptions)).render();
const chatNameButton = (new Button(chatNameButtonOptions)).render();
const modalWindowRenameChat = (new Modal(modalWindowRenameChatOptions)).render();

const chatListComponent = (new ChatList()).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ 
  attachImg: '/assets/paperclip.svg',
  submitImg: '/assets/submit.svg',
  photoImg: '/assets/photoMenuIcon.svg',
  fileImg: '/assets/fileMenuIcon.svg',
  locationImg: '/assets/locationMenuIcon.svg',
  chatListComponent,
  chatInput,
  submitButton,
  titles,
  modalWindowRenameChat,
  chatNameButton,
  profileAvatar,
  chatMock,
});
const root = document.querySelector('#chat');
if (root) {
  root.innerHTML = pageToReturn;
}

const attachElement = document.querySelector('.chat-footer-attach');
attachElement?.addEventListener('click', onAttachClickHandler);

const settings = document.querySelector('.chat-footer-menu');
settings?.addEventListener('click', event => event.stopPropagation());
