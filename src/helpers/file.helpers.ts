export const isBase64Image = (value: string) =>
  /^data:image\/[a-zA-Z+.-]+;base64,/.test(value);
