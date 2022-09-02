import { View } from './view';

export const handleKeyEvent = (event: KeyboardEvent, view: View) => {
  if (event.key === 'Enter') {
    view.commandRunner({
      name: 'submit',
    });
  }

  if (event.key === 'Backspace') {
    view.commandRunner({
      name: 'backspace',
    });
  }

  // Try to add the key's character to the view
  const char = event.key;
  view.commandRunner({
    name: 'addChar',
    payload: char,
  });
};

// User input is entered into the bottom row. It's submitted with enter.
// Make a terminal that the user can navigate around.
