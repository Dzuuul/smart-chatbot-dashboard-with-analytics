import { PrismaClient } from '@prisma/client-mongo';

const globalForPrisma = globalThis as unknown as {
  prismaMongo: PrismaClient | undefined;
};

export const keys = globalForPrisma.prismaMongo ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaMongo = keys;
