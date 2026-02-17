import { describe, expect, it } from '@jest/globals';
import { User, UserRole } from './user.entity';

describe('User Entity', () => {
  const mockUserData = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
    role: UserRole.USER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('constructor', () => {
    it('should create user with provided data', () => {
      const user = new User(mockUserData);

      expect(user.id).toBe(mockUserData.id);
      expect(user.email).toBe(mockUserData.email);
      expect(user.role).toBe(UserRole.USER);
    });
  });

  describe('updateRefreshToken', () => {
    it('should update refresh token', () => {
      const user = new User(mockUserData);
      const newToken = 'new-refresh-token';

      user.updateRefreshToken(newToken);

      expect(user.refreshToken).toBe(newToken);
    });
  });

  describe('deactivate', () => {
    it('should deactivate user', () => {
      const user = new User(mockUserData);

      user.deactivate();

      expect(user.isActive).toBe(false);
    });
  });
});
