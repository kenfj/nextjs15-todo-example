import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/nextjs-help

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default for unit testing
// https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing#singleton
// https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o#why-mock-prisma-client
export default prisma;
