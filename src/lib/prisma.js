import { PrismaClient } from '@prisma/client';

let prisma;

// In production, always create a new PrismaClient instance.
// In development, ensure the instance is cached in the global scope
// to prevent multiple instances during hot reloads.
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

export default prisma;
