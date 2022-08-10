export const interpretKeyEvent = (event: KeyboardEvent) => {
  if (event.key === 'Enter') return '\n';
  return String.fromCharCode(event.keyCode);
};
