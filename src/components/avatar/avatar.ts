import Handlebars from 'handlebars';

import '../../utils/handlebarsHelpers';
import { IAvatarOptions } from '../../utils/interfaces';
import Block from '../block/block';
import avatar from './avatar.html';
import './avatar.less';

class Avatar extends Block {
  constructor(options: IAvatarOptions, rootId?: string) {
    const defineAvatarClasses = () => {
      let avatarClassName = options.avatarClass ? ` ${options.avatarClass}` : '';
      avatarClassName += options.isNoUpload ? ' avatar-no-upload' : '';

      return avatarClassName;
    };

    options.avatarClass = defineAvatarClasses();
    options.avatarSrc = options.avatarSrc || '/assets/avatar.svg';

    super(options, rootId);
  }

  render(): string {
    const template = Handlebars.compile(avatar);

    return template(this.props);
  }
}

export default Avatar;
