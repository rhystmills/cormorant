import { View } from './view';

export const handleKeyEvent = (event: KeyboardEvent, view: View) => {
  if (event.key === 'Enter') {
    view.goToNextRow();
  }

  if (event.key === 'Backspace') {
    view.removeChar();
  }

  // Try to add the key's character to the view
  const char = event.key;
  view.addChar(char);
};
