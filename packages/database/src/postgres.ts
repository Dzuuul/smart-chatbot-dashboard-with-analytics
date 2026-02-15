import { PrismaClient } from '@prisma/client-postgres';

const globalForPrisma = globalThis as unknown as {
  prismaPostgres: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prismaPostgres ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prismaPostgres = prisma;
