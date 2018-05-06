/// <reference path="../../index.d.ts" />

import { expect } from 'chai';
import 'mocha';

import ExError from '../';

it('should create default error', () => {
  const DefError = ExError();
  const testError = new DefError();

  try {
    throw testError;
  } catch (err) {
    expect(err.message).eq('');
    expect(err.name).eq('Error');
    expect(err).instanceof(DefError);
  }
});

it('should use custom error message from default error', () => {
  const DefError = ExError();
  const testError = new DefError('Default error');

  try {
    throw testError;
  } catch (err) {
    expect(err.message).eq('Default error');
    expect(err.name).eq('Error');
    expect(err).instanceof(DefError);
  }
});

it('should use error message from Error instance', () => {
  const TestError = ExError('TestError');
  const err = new Error('Test error');

  const throwError = new TestError(err);

  try {
    throw throwError;
  } catch (e) {
    expect(e.message).eq('Test error');
    expect(e.name).eq('TestError');
    expect(e).instanceof(TestError);
  }
});

it('should have custom properties', () => {
  const customProps = {
    code: 500,
    otherMessage: 'Other message'
  };

  const TestError = ExError('TestError');
  const err = new TestError('Test error', customProps);

  try {
    throw err;
  } catch (e) {
    expect(e.message).eq('Test error');
    expect(e.name).eq('TestError');
    expect(e.code).eq(500);
    expect(e.otherMessage).eq('Other message');
    expect(e).instanceof(TestError);
  }
});

it('toString() should get the error message', () => {
  const TestError = ExError('TestError');
  const err = new TestError('Test error');

  try {
    throw err;
  } catch (e) {
    expect(e.toString()).eq('TestError: Test error');
    expect(e.message).eq('Test error');
    expect(e).instanceof(TestError);
  }
});

it('can be extended using class', () => {
  const TestError = ExError('TestError');
  class CustomError extends TestError {}

  try {
    throw new CustomError('Custom error');
  } catch (e) {
    expect(e).instanceof(CustomError);
    expect(e.name).eq('TestError');
    expect(e.message).eq('Custom error');
  }
});
