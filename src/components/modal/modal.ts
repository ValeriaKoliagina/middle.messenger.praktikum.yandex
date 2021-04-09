import Handlebars from 'handlebars';

import { IModalOptions } from '../../utils/interfaces';
import Block from '../block/block';
import modal from './modal.html';
import './modal.less';

class Modal extends Block {
  constructor(options: IModalOptions, rootId?: string) {
    options.events = {
      click: () => this._closeModal()
    };

    super(options, rootId);
  }

  private _closeModal() {
    const openedModal = document.querySelector(`#${(<IModalOptions> this.props).elementId}`);
    openedModal?.classList.remove('modal-open');
  }

  detachListeners(): void {
    const modalOverlay = document.querySelector(`#${(<IModalOptions> this.props).elementId} .modal-overlay`);

    if (this.props.events && modalOverlay) {
      Object.keys(this.props.events).forEach(key => {
        modalOverlay.removeEventListener(key, this.props.events[key]);
      });
    }

    Object.keys(this.props).forEach(key => {
      if (this.props[key]?.props?.elementId) {
        this.props[key].detachListeners();
      }
    });
  }

  attachListeners(): void {
    const modalOverlay = document.querySelector(`#${(<IModalOptions> this.props).elementId} .modal-overlay`);

    if (this.props.events && modalOverlay) {
      Object.keys(this.props.events).forEach(key => {
        modalOverlay.addEventListener(key, this.props.events[key]);
      });
    }

    Object.keys(this.props).forEach(key => {
      if (this.props[key]?.props?.elementId) {
        this.props[key].attachListeners();
      }
    });
  }

  render(): string {
    const template = Handlebars.compile(modal);

    return template({
      ...this.props,
      modalInput: (<IModalOptions> this.props).modalInput?.render(),
      modalButton: (<IModalOptions> this.props).modalButton.render(),
      modalCancelButton: (<IModalOptions> this.props).modalCancelButton?.render(),
    });
  }
}

export default Modal;
