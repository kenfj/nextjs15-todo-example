import { Prisma, Todo, User } from '@prisma/client';

export const mockDate = new Date("2025-01-01T01:02:03+09:00");

export const user1: User = {
  id: "fake-user-id",
  email: "user@prisma.io",
  name: "Prisma Fan",
  emailVerified: null,
  image: null,
  createdAt: mockDate,
  updatedAt: mockDate,
}

export const todo1: Todo = {
  id: 1,
  title: "Buy apple",
  completed: false,
  userId: "user.id",
  createdAt: mockDate,
  updatedAt: mockDate,
}

export const todo2: Todo = {
  id: 2,
  title: "Buy banana",
  completed: false,
  userId: "user.id",
  createdAt: mockDate,
  updatedAt: mockDate,
}

// https://www.prisma.io/docs/orm/reference/error-reference#p1001
const messageP1001 = (
  "Can't reach database server at {database_host}:{database_port}"
  + " Please make sure your database server is running"
  + " at {database_host}:{database_port}."
);

export const mock_cannot_reach_database_error = new Prisma.PrismaClientKnownRequestError(
  messageP1001, { code: "P1001", clientVersion: "mock-client-version" }
);

// https://www.prisma.io/docs/orm/reference/error-reference#p2025
const cause = "Expected a record, found none.";
const messageP2025 = ("An operation failed because it depends on "
  + `one or more records that were required but not found. ${cause}`)

export const mock_not_found_error = new Prisma.PrismaClientKnownRequestError(
  messageP2025, { code: "P2025", clientVersion: "mock-client-version" }
);
