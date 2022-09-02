export type Command<T = undefined>= {
    name: string;
    payload?: T;
}

export type CommandHandler = {
    name: string;
    handler: (payload: unknown) => unknown;
}
export const createCommandRunner = <T>(
  commandHandlers: CommandHandler[],
) => (command: Command<T>) => {
    const commandToCall = commandHandlers.find(
      (commandHandler) => (commandHandler.name === command.name),
    );
    return commandToCall?.handler(command.payload);
  };
