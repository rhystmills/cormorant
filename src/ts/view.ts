import { Block } from './block';
import { CommandHandler, createCommandRunner } from './commandHandler';

export class View {
  display: Block;
  commandLine: Block;

  constructor() {
    this.display = new Block(66, 17, true);
    this.commandLine = new Block(66, 1, false);
  }

  removeChar() {
    this.commandLine.removeChar();
  }

  addChar(char: string) {
    this.commandLine.addChar(char);
  }

  getText() {
    return [...this.display.getText(), this.commandLine.getText()];
  }

  getCommandLineRow() {
    return this.display.getRows();
  }

  lowLevelCommandHandlers: CommandHandler[] = [
    {
      name: 'backspace',
      handler: () => {
        this.commandLine.removeChar();
      },
    },
    {
      name: 'submit',
      handler: () => {
        const cliCommand = this.commandLine.getText()[0];
        this.commandLine.clearRow();
        this.parseCliCommand(cliCommand);
      },
    },
    {
      name: 'addChar',
      handler: (payload) => {
        if (payload) {
          this.commandLine.addChar(payload as string);
        }
      },
    },
  ];

  cliCommandHandlers: CommandHandler[] = [
    {
      name: 'print',
      handler: (payload) => { this.display.printLine(payload as string); },
    },
    {
      name: 'help',
      handler: () => {
        this.display.printLine('Welcome to Cormorant. Supported commands:');
        this.display.printLine('- help');
        this.display.printLine('- print [text]');
      },
    },
  ];

  commandHandlers = [...this.lowLevelCommandHandlers, ...this.cliCommandHandlers];

  commandRunner = createCommandRunner<unknown>(
    this.commandHandlers,
  );

  parseCliCommand(cliCommand: string) {
    const request = cliCommand.includes(' ') ? {
      name: cliCommand.substring(0, cliCommand.indexOf(' ')),
      payload: cliCommand.substring(cliCommand.indexOf(' ') + 1),
    } : {
      name: cliCommand,
    };

    this.display.printLine(`> ${cliCommand}`);

    if (this.cliCommandHandlers.find(
      (commandHandler) => commandHandler.name === request.name,
    )) {
      this.commandRunner(request);
    } else {
      this.display.printLine(`Command '${request.name}' not recognised`);
    }
  }
}
