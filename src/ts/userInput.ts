export type data = {
  text: string[],
  currentRow: number,
  maxLength: number,
  rows: number,
}

const permittedChars = "abcdefghijklmnopqrstuvwxyz.,?!:;|'[]+=-_!@£$%^&*() ";
const upperPermittedChars = permittedChars.toUpperCase();

export const handleKeyEvent = (event: KeyboardEvent, data: data) => {
  const { currentRow, maxLength, rows } = data;

  if (event.key === 'Enter') {
    console.log(data);
    if (data.currentRow < rows) { data.currentRow += 1; }
    console.log(data);
    return;
  }

  if (event.key === 'Backspace') {
    const text = data.text[currentRow];

    if (text.length > 0) {
      const newText = text.slice(0, -1);
      data.text[currentRow] = newText;
    } else if (text.length === 0 && currentRow > 0) {
      data.currentRow--;
      const newText = data.text[data.currentRow].slice(0, -1);
      data.text[data.currentRow] = newText;
    }

    return;
  }

  if (data.text[currentRow].length < maxLength) {
    const char = event.key;
    if (permittedChars.includes(char) || upperPermittedChars.includes(char)) {
      data.text[currentRow] += char;
    }
  } else if (data.currentRow < data.rows) {
    data.currentRow += 1;
  }
};
