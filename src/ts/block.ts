import { getTextRows, stringForEach } from './helpers';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const upperAlphabet = alphabet.toUpperCase();
const specialChars = '.,?!:;|"\'[]+=-_!@£%^&*()<>~ ';

export class Block {
  maxLength: number;
  rows: number;
  shiftRowsEnabled: boolean;
  private currentRow: number;
  private text: string[];
  private permittedChars: string;
  //   private commandLine: string;

  constructor(maxLength: number, rows: number, shiftRowsEnabled: boolean) {
    this.maxLength = maxLength;
    this.rows = rows;
    this.currentRow = 0;
    this.text = getTextRows(rows);
    this.permittedChars = alphabet + upperAlphabet + specialChars;
    this.shiftRowsEnabled = shiftRowsEnabled;
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
    return this.permittedChars.includes(char);
  }

  addText(text: string) {
    stringForEach(text, (char) => {
      this.addChar(char);
    });
  }

  goToNextRow() {
    if (this.currentRow >= this.rows - 1) {
      if (this.shiftRowsEnabled) this.shiftRowsUp();
    } else this.currentRow++;
  }

  goToPreviousRow() {
    if (this.currentRow > 0) {
      this.currentRow--;
    }
  }

  printLine(text: string) {
    this.goToNextRow();
    this.addText(text);
  }

  shiftRowsUp() {
    this.text.shift();
    this.text.push('');
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

  clearRow() {
    this.text[this.currentRow] = '';
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

  getRows() {
    return this.rows;
  }

  getCurrentRow() {
    return this.currentRow;
  }
}
