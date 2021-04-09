import Aside from '../components/aside/aside';
import Avatar from '../components/avatar/avatar';
import Button from '../components/button/button';
import Input from '../components/input/input';
import ChatList from '../components/chatList/chatList';
import Modal from '../components/modal/modal';
import ChatListItem from '../components/chatListItem/chatListItem';

interface IOptions {
  events?: Record<string, (event: Event) => void>;
  elementId?: string;
  lemur?: boolean;
}

interface IButtonOptions extends IOptions {
  buttonText?: string;
  buttonType?: string;
  buttonClass?: string;
  buttonImg?: string;
}

interface IInputOptions extends IOptions {
  inputId?: string;
  label?: string;
  inputType?: string;
  inputClass?: string;
  inputPlaceholder?: string;
  info?: string;
  name?: string;
  errorMessage?: string;
  error?: string | boolean;
  validateFunctions?: Array<(value: string) => string>;
}

interface ILoginPageOptions extends IOptions {
  loginButton: Button;
  registerButton: Button;
  loginInput: Input;
  passwordInput: Input;
}

interface ISignupPageOptions extends IOptions {
  signupButton: Button;
  rememberAllButton: Button;
  emailInput: Input;
  loginInput: Input;
  nameInput: Input;
  surnameInput: Input;
  passwordInput: Input;
  passwordRepeatInput: Input;
}

interface IErrorPageOptions extends IOptions {
  returnToChatsButton: Button;
}

interface IAsideOptions extends IOptions {
  backButton: Button;
}

interface IAvatarOptions extends IOptions {
  avatarClass?: string;
  isNoUpload?: boolean;
  avatarSrc?: string;
  avatarError?: string;
}

interface IChatListItemOptions extends IOptions {
  className?: string;
  chatName?: string;
  avatar: string;
  lastMessage: string;
  lastMessageDate: string;
  newMessageCount?: number | null;
  selected?: boolean;
  profileAvatar: Avatar;
}

interface IProfilePageOptions extends IOptions {
  aside: Aside;
  profileAvatar: Avatar;
  changeInfoButton: Button;
  changePasswordButton: Button;
  logoutButton: Button;
}

interface IProfileEditPageOptions extends IOptions {
  aside: Aside;
  profileAvatar: Avatar;
  saveButton: Button;
  emailInput: Input;
  loginInput: Input;
  nameInput: Input;
  surnameInput: Input;
  chatNameInput: Input;
  phoneInput: Input;
}

interface IChangePasswordPageOptions extends IOptions {
  aside: Aside;
  profileAvatar: Avatar;
  saveButton: Button;
  oldPasswordInput: Input,
  passwordInput: Input,
  passwordRepeatInput: Input,
}

interface IModalOptions extends IOptions {
  modalTitle: string;
  modalInput?: Input;
  modalButton: Button;
  modalCancelButton?: Button;
  modalText?: string;
}

interface IChatsPageOptions extends IOptions {
  chatListComponent: ChatList;
}

interface IChatPageOptions extends IOptions {
  profileAvatar: Avatar,
  chatInput: Input,
  submitButton: Button,
  chatNameButton: Button,
  modalWindowRenameChat: Modal,
  chatListComponent: ChatList,
}

interface IChatListOptions extends IOptions {
  settingsButton: Button;
  createChatButton: Button;
  profileButton: Button;
  addUserButton: Button;
  deleteUserButton: Button;
  deleteChatButton: Button;
  chatSearchInput: Input;
  modalWindowAddUser: Modal,
  modalWindowDeleteUser: Modal,
  modalWindowDeleteChat: Modal,
  modalWindowCreateChat: Modal,
  chatListItems: ChatListItem[],
}

export {
  IButtonOptions,
  IInputOptions,
  IOptions,
  ILoginPageOptions,
  ISignupPageOptions,
  IErrorPageOptions,
  IAsideOptions,
  IAvatarOptions,
  IChatListItemOptions,
  IProfilePageOptions,
  IProfileEditPageOptions,
  IChangePasswordPageOptions,
  IModalOptions,
  IChatListOptions,
  IChatsPageOptions,
  IChatPageOptions,
};
