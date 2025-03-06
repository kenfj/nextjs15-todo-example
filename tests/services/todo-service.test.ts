import { expect, test } from 'vitest';

import prismaMock from '@/lib/__mocks__/prisma';
import { findAllTodos } from '@/services/todo-service';

import { todo1, todo2 } from '../fixtures/test-data';

test('findAllTodos should return all todos for the authenticated user', async () => {
  prismaMock.todo.findMany.mockResolvedValue([todo1, todo2]);

  const result = await findAllTodos();

  expect(result.data).toStrictEqual([todo1, todo2]);
  expect(result.error).toBeUndefined();
});

test('findAllTodos should return an error if no todos are found', async () => {
  prismaMock.todo.findMany.mockResolvedValue([]);

  const result = await findAllTodos();

  expect(result.data).toStrictEqual([]);
  expect(result.error).toBeUndefined();
});
