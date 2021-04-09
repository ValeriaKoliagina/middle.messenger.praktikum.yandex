import Handlebars from 'handlebars';

import titles from '../../constants/titles';
import '../../utils/handlebarsHelpers'
import Button from '../../components/button/button';
import template from './404.html';
import './404.less';

const returnToChatsButtonOptions = {
  buttonText: titles.RETURN_TO_CHATS, 
  buttonClass: 'button-big',
  clickHandler: () => location.href='index.html',
}

const returnToChatsButton = (new Button(returnToChatsButtonOptions)).render();

const page = Handlebars.compile(template);
const pageToReturn = page({ returnToChatsButton, titles });
const root = document.querySelector('#page-404');
if (root) {
  root.innerHTML = pageToReturn;
}
