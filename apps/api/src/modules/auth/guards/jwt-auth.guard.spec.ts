import { describe, jest, beforeEach, it, expect } from '@jest/globals';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as any;

    guard = new JwtAuthGuard(reflector);
  });

  describe('canActivate', () => {
    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    it('should allow access to public routes', () => {
      reflector.getAllAndOverride.mockReturnValue(true);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
    });

    it('should check JWT for protected routes', () => {
      reflector.getAllAndOverride.mockReturnValue(false);

      // Mock parent canActivate
      jest.spyOn(guard, 'canActivate').mockReturnValue(true);

      const result = guard.canActivate(mockContext);

      expect(result).toBe(true);
    });
  });

  describe('handleRequest', () => {
    it('should return user if valid', () => {
      const user = { userId: '1', email: 'test@example.com' };
      const result = guard.handleRequest(null, user);
      expect(result).toBe(user);
    });

    it('should throw UnauthorizedException if no user', () => {
      expect(() => guard.handleRequest(null, null)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
