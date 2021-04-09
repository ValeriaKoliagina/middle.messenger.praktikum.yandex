import Handlebars from 'handlebars';

import titles from '../../constants/titles';
import ChatList from '../../components/chatList/chatList';
import template from './chats.html';
import './chats.less';

const chatListComponent = (new ChatList()).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ 
  chatListComponent,
  titles,
});
const root = document.querySelector('#chats');
if (root) {
  root.innerHTML = pageToReturn;
} 
