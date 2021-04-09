export const generateRandomString = (): string => `_${Math.random().toString(36)
  .substr(2, 10)}`;

export const getFormData = (form: HTMLFormElement): Record<string, FormDataEntryValue> => {
  const formData = Array.from(new FormData(form).entries());

  return formData.reduce((acc: Record<string, FormDataEntryValue>, [ key, value ]) => ({...acc, [key]: value}), {});
};

export const getName = (event: Event): string => (<HTMLInputElement>event.target)?.name;
