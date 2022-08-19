import { stringForEach } from "./helpers";

const getTextRows = (rows: number) => {
  const text = [];
  for (let i = 0; i < rows; i++) {
    text.push('');
  }
  return text;
};

export class View {
  maxLength: number;
  rows: number;
  private currentRow: number;
  private text: string[];
  private permittedChars: string;
  private upperPermittedChars: string;

  constructor(maxLength: number, rows: number) {
    this.maxLength = maxLength;
    this.rows = rows;
    this.currentRow = 0;
    this.text = getTextRows(rows);
    this.permittedChars = "abcdefghijklmnopqrstuvwxyz.,?!:;|'[]+=-_!@£$%^&*() ";
    this.upperPermittedChars = this.permittedChars.toUpperCase();
    // Bottom row should be for typing commands!
  }

  addChar(char: string) {
    if (!this.rowIsFull()) {
      if (this.charIsPermitted(char)) {
        this.text[this.currentRow] += char;
      }
    } else {
      this.goToNextRow();
      this.addChar(char);
    }
  }

  charIsPermitted(char: string) {
    return this.permittedChars.includes(char) || this.upperPermittedChars.includes(char);
  }

  addText(text: string) {
    stringForEach(text, (char) => {
      this.addChar(char);
    });
  }

  goToNextRow() {
    if (this.currentRow >= this.rows - 1) {
      this.shiftRowsUp();
    } else this.currentRow++;
  }

  goToPreviousRow() {
    if (this.currentRow > 0) {
      this.currentRow--;
    }
  }

  shiftRowsUp() {
    this.text.shift();
    this.text.push('');
    console.log(this.currentRow)
    console.log(this.text)
  }

  removeChar() {
    if (this.rowIsEmpty() && this.currentRow > 0) {
      this.goToPreviousRow();
      this.removeChar();
    } else {
      const newText = this.text[this.currentRow].slice(0, -1);
      this.text[this.currentRow] = newText;
    }
  }

  getCurrentRowText() {
    return this.text[this.currentRow];
  }

  rowIsFull() {
    return this.getCurrentRowText().length >= this.maxLength;
  }

  rowIsEmpty() {
    return this.text[this.currentRow] === '';
  }

  getText() {
    return this.text;
  }

  getCurrentRow() {
    return this.currentRow;
  }
}
