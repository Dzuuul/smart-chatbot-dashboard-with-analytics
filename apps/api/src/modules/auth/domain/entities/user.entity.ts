export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  refreshToken?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  updateRefreshToken(token: string): void {
    this.refreshToken = token;
  }

  deactivate(): void {
    this.isActive = false;
  }
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  AGENT = 'AGENT',
}
