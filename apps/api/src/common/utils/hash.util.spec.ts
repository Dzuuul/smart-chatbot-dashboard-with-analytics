import { describe, expect, it } from '@jest/globals';
import { HashUtil } from './hash.util';

describe('HashUtil', () => {
  const testPassword = 'TestPassword123!';

  describe('hash', () => {
    it('should hash password successfully', async () => {
      const hash = await HashUtil.hash(testPassword);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(testPassword);
      expect(hash.startsWith('$2b$')).toBe(true);
    });

    it('should generate different hashes for same password', async () => {
      const hash1 = await HashUtil.hash(testPassword);
      const hash2 = await HashUtil.hash(testPassword);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('compare', () => {
    it('should return true for correct password', async () => {
      const hash = await HashUtil.hash(testPassword);
      const isMatch = await HashUtil.compare(testPassword, hash);

      expect(isMatch).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const hash = await HashUtil.hash(testPassword);
      const isMatch = await HashUtil.compare('WrongPassword', hash);

      expect(isMatch).toBe(false);
    });
  });
});
