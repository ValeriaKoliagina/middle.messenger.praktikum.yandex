import Handlebars from 'handlebars';

Handlebars.registerHelper('img', (src: string, options: Record<string, Record<string, string>>) => `<img src='${src}'${options.hash.class ? ' class=\'' + options.hash.class + '\'': ''} alt='${options.hash.alt}' />`);
