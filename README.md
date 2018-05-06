# Ex-Error [![Build Status](https://travis-ci.org/reyhansofian/ex-error.svg?branch=master)](https://travis-ci.org/reyhansofian/ex-error) [![Coverage Status](https://coveralls.io/repos/github/reyhansofian/ex-error/badge.svg?branch=master)](https://coveralls.io/github/reyhansofian/ex-error?branch=master)

An extendible error class for creating custom error.

## Why Use This Package?

Custom error object is quite useful if you need to filter specific error type. You can read [this article](https://medium.com/@xjamundx/custom-javascript-errors-in-es6-aa891b173f87) to get more context why custom error is very useful.

### Example:

```js
// With standard error object
try {
  // Normally one will throw an error
  throw new Error('Error on auth');
} catch (err) {
  // catch error in here
}

// With custom error object
try {
  throw new AuthError('Your password is missing');
} catch (err) {
  if (err instanceof AuthError) {
    // process error for AuthError
  } else {
    // process error for other than AuthError
  }
}
```

## Using Package

```js
import exError from 'ex-error';
// or
const exError = require('ex-error');

// creating default error object from standard Error class
const DefaultError = exError();

try {
  // adding error message
  throw new DefaultError('Error using default error');
} catch (e) {
  console.log(e.message); // -> 'Error using default error'
  console.log(e.name); // -> 'Error'
  console.log(e instanceof DefaultError); // -> true
}

// creating custom error object
const CustomError = exError('CustomError');

try {
  // adding error message and custom properties
  throw new CustomError('Custom error', {
    code: 500,
    otherMessage: 'other message'
  });
} catch (e) {
  console.log(e.message); // -> 'Custom error'
  console.log(e.name); // -> 'CustomError'
  console.log(e instanceof CustomError); // -> true
  console.log(e.code); // -> 500
  console.log(e.otherMessage); // -> 'other message'
}
```

One can also use it as class extension

```js
import exError from 'ex-error';

const CustomError = exError('CustomError');

class UseCustomError extends CustomError {}

try {
  // adding error message and custom properties
  throw new UseCustomError('Custom error', {
    code: 500,
    otherMessage: 'other message'
  });
} catch (e) {
  console.log(e.message); // -> 'Custom error'
  console.log(e.name); // -> 'CustomError'
  console.log(e instanceof CustomError); // -> true
  console.log(e.code); // -> 500
  console.log(e.otherMessage); // -> 'other message'
}
```

## License

Licensed under the [MIT License](http://opensource.org/licenses/MIT).
You can find a copy of it in [LICENSE](LICENSE).
