import { PrismaClient } from './generated/prisma/client';
import { PrismaClient as PrismaClientMongo } from './generated/prisma-mongo';

export * from './generated/prisma/client';
export { PrismaClientMongo };

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  prismaMongo: PrismaClientMongo;
};

// @ts-ignore
export const prisma = globalForPrisma.prisma || new PrismaClient();
// @ts-ignore
export const prismaMongo =
  globalForPrisma.prismaMongo || new PrismaClientMongo();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaMongo = prismaMongo;
}
