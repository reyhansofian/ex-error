declare function ExError(name: string): ExtendsError;

declare class ExtendsError extends Error {
  public name: string;
  public message: string;
  public stack: any;
  [key: string]: any;

  constructor(message: string | Error, props: any);
}

export = ExError;
