import Handlebars from 'handlebars';

import { createListener } from '../../utils/utils';
import modal from './modal.html'
import './modal.less'

class Modal {
  constructor({ modalTitle, modalInput, modalButton, modalCancelButton, id, modalText, closeModal }) {
    this.modalTitle = modalTitle;
    this.modalInput = modalInput;
    this.modalButton = modalButton;
    this.modalCancelButton = modalCancelButton;
    this.closeModal = closeModal;
    this.id = id;
    this.modalText = modalText;

    const onCloseModalClick = () => {
      const openedModal = document.querySelector(`#${id}`);
      openedModal?.classList.remove('modal-open');
    }

    this.closeModalName = createListener(onCloseModalClick);
  }

  render() {
    const options = {
      modalTitle: this.modalTitle,
      modalInput: this.modalInput,
      modalButton: this.modalButton,
      modalCancelButton: this.modalCancelButton,
      id: this.id,
      modalText: this.modalText,
    }
 
    options.closeModal = `${this.closeModalName}()`

    const template = Handlebars.compile(modal);
    return template(options);
  }
}

export default Modal
