import { Todo, User } from '@prisma/client';

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
