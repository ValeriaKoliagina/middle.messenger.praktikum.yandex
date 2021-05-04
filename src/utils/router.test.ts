import 'regenerator-runtime/runtime';
import { expect } from 'chai';
import jsdom from 'jsdom-global';

import { NotFound } from '../pages/notFound/notFound';
import { Oops } from '../pages/oops/oops';
import { Router } from './router';

describe('Router', () => {
  let testRouter: Router;

  before(function() {
    this.jsdom = jsdom('<html><head></head><body></body></html>', { url: 'http://localhost' });
  });

  beforeEach(function() {
    testRouter = new Router();
    testRouter
      .use('/not_found', NotFound)
      .use('/oops', Oops)
      .start();

    window.history.pushState({ name: 'back' }, 'not found', 'http://localhost/not_found');
    window.history.pushState({ name: 'oops' }, 'oops', 'http://localhost/oops');
  });

  it('state of Router should be increased', () => {
    const startLength = testRouter.history.length;

    window.history.pushState({}, 'not found', 'http://localhost/not_found');
    window.history.pushState({}, 'oops', 'http://localhost/oops');

    expect(testRouter.history.length).to.eq(startLength + 2);
  });

  it('function "back" should return previos pathname ', done => {
    const expectedResult = 'http://localhost/not_found';
    testRouter.back();

    setTimeout(() => {
      expect(window.location.href).be.equal(expectedResult);
      done();
    }, 10);
  });

  it('function "go" should return choosen pathname ', done => {
    const expectedResult = 'http://localhost/not_found';
    testRouter.go(expectedResult);

    setTimeout(() => {
      expect(window.location.href).be.equal(expectedResult);
      done();
    }, 10);
  });

  it('function "getRoute" should return choosen route ', done => {
    const expectedResult = '/not_found';
    const result = testRouter.getRoute(expectedResult)?._pathname;

    setTimeout(() => {
      expect(result).be.equal(expectedResult);
      done();
    }, 10);
  });
});
