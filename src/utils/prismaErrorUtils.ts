import { Prisma } from '@prisma/client';

export function inspectPrismaError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return `Known Request Error: ${error.code} - ${error.name} - ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return `Unknown Request Error: ${error.name} - ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return `Rust Panic Error: ${error.name} - ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return `Initialization Error: ${error.name} - ${error.message}`;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return `Validation Error: ${error.name} - ${error.message}`;
  } else {
    return `Unknown error: ${error}`;
  }
}
