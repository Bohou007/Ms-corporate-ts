import { JsonMiddlewareMiddleware } from './json-middleware.middleware';

describe('JsonMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new JsonMiddlewareMiddleware()).toBeDefined();
  });
});
