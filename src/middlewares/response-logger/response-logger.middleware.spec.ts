import { ResponseLoggerMiddleware } from './response-logger.middleware';

describe('ResponseLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new ResponseLoggerMiddleware()).toBeDefined();
  });
});
