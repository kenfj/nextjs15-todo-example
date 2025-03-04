import { Prisma } from '@prisma/client';
import { expect, test } from 'vitest';

import prismaMock from '@/lib/__mocks__/prisma';
import { createTodo } from '@/repositories/todo-repository';

import { todo1 } from '../fixtures/test-data';

// https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing

test('createTodo should return the new todo', async () => {
  prismaMock.todo.create.mockResolvedValue(todo1)

  const input: Prisma.TodoCreateInput = {
    title: "Buy apple",
    user: { connect: { email: "testing@example.com" } },
  }
  const createdTodo = await createTodo(input)

  expect(createdTodo).toStrictEqual(todo1)
})
