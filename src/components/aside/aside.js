import Handlebars from 'handlebars';

import Button from '../button/button';
import aside from './aside.html';
import './aside.less';

class Aside {
  constructor() {
    const backButtonOptions = {
      buttonImg: '/assets/submit.svg',
      buttonClass: `button-round button-transform`,
      clickHandler: () => window.history.back(),
    }

    this.backButton = (new Button(backButtonOptions)).render();
  }

  render() {
    const options = {
      backButton: this.backButton,
    }

    const template = Handlebars.compile(aside);
    return template(options);
  }
}

export default Aside
