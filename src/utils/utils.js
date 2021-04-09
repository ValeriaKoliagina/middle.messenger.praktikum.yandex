export const generateRandomString = () => `_${Math.random().toString(36).substr(2, 10)}`;

export const createListener = handler => {
  const handlerName = generateRandomString();
  window[handlerName] = handler;

  return handlerName;
}

export const getFormData = form => Object.fromEntries(new FormData(form).entries());
