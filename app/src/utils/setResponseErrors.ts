export interface ResponseErrors extends Record<string, string[]> {}

export const setResponseErrors = (error: any, setError: Function) => {
  const errors: Record<string, string[]> = error?.response?.data?.errors;
  if (!errors) {
    return;
  }
  Object.entries(errors).forEach(([key, messages]) => {
    setError(key, {
      type: 'server',
      message: messages[0],
    });
  });
};
