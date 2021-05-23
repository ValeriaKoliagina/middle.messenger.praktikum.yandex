module.exports = function(src) {
  if (!src) { 
    return ''; 
  }
  
  const date = new Date(src);
  const options = {
    hour: '2-digit',
    minute: '2-digit'
  };

  if (date.getDate() !== new Date().getDate()
    || date.getMonth() !== new Date().getMonth()
    || date.getFullYear() !== new Date().getFullYear()) {
    options.day = 'numeric';
    options.month = 'short';
  }

  if (date.getFullYear() !== new Date().getFullYear()) {
    options.year = 'numeric';
  }

  return new Date(src).toLocaleTimeString('ru-RU', options);
};
