const generateRandomString = (): string => `_${Math.random().toString(36)
  .substr(2, 10)}`;

const getFormData = (form: HTMLFormElement): Record<string, FormDataEntryValue> => Object.fromEntries((new FormData(form).entries()));

const getName = (event: Event): string => (<HTMLInputElement>event.target)?.name;

export { generateRandomString, getFormData, getName };
