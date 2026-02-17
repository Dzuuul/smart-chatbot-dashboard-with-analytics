import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, UserRole } from '../../domain/entities/user.entity';

// Mock Prisma client - replace with actual import from @smart-chatbot/database
interface PrismaUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  refreshToken: string | null;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  // Inject PrismaService here
  // constructor(private readonly prisma: PrismaService) {}

  private users: PrismaUser[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    return user ? this.toDomain(user) : null;
  }

  async create(userData: Partial<User>): Promise<User> {
    const newUser: PrismaUser = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email!,
      password: userData.password!,
      name: userData.name!,
      role: userData.role || UserRole.USER,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      refreshToken: null,
    };
    this.users.push(newUser);
    return this.toDomain(newUser);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');

    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.toDomain(this.users[index]);
  }

  async updateRefreshToken(id: string, token: string | null): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      await this.update(id, { refreshToken: token || undefined });
    }
  }

  private toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
      name: prismaUser.name,
      role: prismaUser.role as UserRole,
      isActive: prismaUser.isActive,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      refreshToken: prismaUser.refreshToken || undefined,
    });
  }
}
