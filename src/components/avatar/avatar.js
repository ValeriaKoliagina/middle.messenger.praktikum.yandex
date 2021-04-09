import Handlebars from 'handlebars';

import '../../utils/handlebarsHelpers'
import { createListener } from '../../utils/utils';
import avatar from './avatar.html'
import './avatar.less'

class Avatar {
  constructor({ avatarClass, avatarSrc, avatarError, clickHandler, isNoUpload }) {
    const defineAvatarClasses = () => {
      let avatarClassName = avatarClass ? ` ${avatarClass}` : '';
      avatarClassName += isNoUpload ? ' avatar-no-upload' : '';

      return avatarClassName;
    }

    this.avatarClass = defineAvatarClasses();
    this.avatarSrc = avatarSrc || '/assets/avatar.svg';
    this.avatarError = avatarError;
    this.isNoUpload = isNoUpload;

    if (clickHandler) {
      this.clickHandler = clickHandler;
      this.clickHandlerName = createListener(this.clickHandler);
    }
  }

  render() {
    const options = {
      avatarClass: this.avatarClass,
      avatarSrc: this.avatarSrc,
      avatarError: this.avatarError,
      isNoUpload: this.isNoUpload,
    }

    if (this.clickHandler) {
      options.clickHandler = `${this.clickHandlerName}()`;
    }

    const template = Handlebars.compile(avatar);
    return template(options);
  }
}

export default Avatar
