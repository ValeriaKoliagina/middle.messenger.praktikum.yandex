import Handlebars from 'handlebars';

Handlebars.registerHelper('img', (src, options) => `<img src='${src}'${options.hash.class ? ' class=\'' + options.hash.class + '\'': ''} alt='${options.hash.alt}' />`);
