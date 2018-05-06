const ExError = (name: string = '') => {
  let errorName = name;

  if (!name || name.constructor !== String) {
    errorName = Error.name;
  }

  return class ExtendsError extends Error {
    public name: string;
    public message: string;
    public stack: any;
    [key: string]: any;

    constructor(message: string | Error = '', props: any = {}) {
      // Reference: https://stackoverflow.com/a/48567560/2763662
      const trueProto = new.target.prototype;
      super();

      Object.setPrototypeOf(this, trueProto);

      this.name = errorName;
      this.message = message instanceof Error ? message.message : message;

      if (Object.keys(props).length) {
        Object.keys(props).forEach((prop: string) => {
          this[prop] = props[prop];
        });
      }

      if (Error.hasOwnProperty('captureStackTrace')) {
        Error.captureStackTrace(this, ExtendsError);
      } else {
        Error.call(this);
      }
    }
  };
};

export default ExError;
