import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: Partial<User>): Promise<User>;
  abstract update(id: string, data: Partial<User>): Promise<User>;
  abstract updateRefreshToken(id: string, token: string | null): Promise<void>;
}
