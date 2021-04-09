import Handlebars from 'handlebars';

import titles from '../../constants/titles';
import '../../utils/handlebarsHelpers'
import Button from '../../components/button/button';
import template from './oops.html';
import './oops.less';

const returnToChatsButtonOptions = {
  buttonText: titles.RETURN_TO_CHATS, 
  clickHandler: () => location.href='index.html',
  buttonClass: 'button-big',
}

const returnToChatsButton = (new Button(returnToChatsButtonOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ returnToChatsButton, titles });
const root = document.querySelector('#oops');
if (root) { 
  root.innerHTML = pageToReturn;
}
