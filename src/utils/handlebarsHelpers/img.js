module.exports = function (src, options) {
  return `<img src='${src}'${options.hash.class ? ' class=\'' + options.hash.class + '\'': ''} alt='${options.hash.alt}' />`
}
