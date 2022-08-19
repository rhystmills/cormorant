export const stringForEach = (str: string, f: (char: string) => void) => {
  for (let i = 0; i < str.length; i++) {
    f(str[i]);
  }
};
