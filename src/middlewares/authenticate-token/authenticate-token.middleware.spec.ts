import { AuthenticateTokenMiddleware } from './authenticate-token.middleware';

describe('AuthenticateTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthenticateTokenMiddleware()).toBeDefined();
  });
});
