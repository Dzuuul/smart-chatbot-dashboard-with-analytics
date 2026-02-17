import { PrismaUserRepository } from './prisma-user.repository';
import { UserRole } from '../../domain/entities/user.entity';
import { beforeEach, describe, expect, it } from '@jest/globals';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;

  beforeEach(() => {
    repository = new PrismaUserRepository();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        role: UserRole.USER,
      };

      const user = await repository.create(userData);

      expect(user).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.role).toBe(UserRole.USER);
      expect(user.isActive).toBe(true);
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const userData = {
        email: 'find@example.com',
        password: 'hashed',
        name: 'Find User',
      };
      await repository.create(userData);

      const found = await repository.findByEmail(userData.email);

      expect(found).toBeDefined();
      expect(found?.email).toBe(userData.email);
    });

    it('should return null for non-existent email', async () => {
      const found = await repository.findByEmail('nonexistent@example.com');
      expect(found).toBeNull();
    });
  });

  describe('updateRefreshToken', () => {
    it('should update refresh token', async () => {
      const user = await repository.create({
        email: 'token@example.com',
        password: 'hashed',
        name: 'Token User',
      });

      await repository.updateRefreshToken(user.id, 'new-token');

      const updated = await repository.findById(user.id);
      expect(updated?.refreshToken).toBe('new-token');
    });
  });
});
