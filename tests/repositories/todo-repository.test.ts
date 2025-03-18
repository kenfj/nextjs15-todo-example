import { Prisma } from "@prisma/client";
import { expect, test } from "vitest";

import prismaMock from "@/lib/__mocks__/prisma";
import { createTodo, deleteTodoById, findAllByUserId, getById } from "@/repositories/todo-repository";

import { mock_not_found_error, todo1, todo2 } from "../fixtures/test-data";

// https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing

test("createTodo should return the new todo", async () => {
  prismaMock.todo.create.mockResolvedValue(todo1);

  const input: Prisma.TodoCreateInput = {
    title: "Buy apple",
    user: { connect: { email: "testing@example.com" } },
  };
  const createdTodo = await createTodo(input);

  expect(createdTodo).toStrictEqual(todo1);
});

test("getById should return the todo with the given id", async () => {
  prismaMock.todo.findUniqueOrThrow.mockResolvedValue(todo1);

  const todo = await getById(todo1.id, "fake-user-id");

  expect(todo).toStrictEqual(todo1);
  expect(prismaMock.todo.findUniqueOrThrow)
    .toHaveBeenCalledWith({
      where: { id: todo1.id, userId: "fake-user-id" },
    });
});

test("getById should throw mock_not_found_error when todo is not found", async () => {
  prismaMock.todo.findUniqueOrThrow.mockRejectedValue(mock_not_found_error);

  await expect(getById(999, "fake-user-id"))
    .rejects.toThrow(Prisma.PrismaClientKnownRequestError);
});

test("findAllByUserId should return all todos for the given user id", async () => {
  prismaMock.todo.findMany.mockResolvedValueOnce([todo1]);
  prismaMock.todo.findMany.mockResolvedValueOnce([todo1, todo2]);

  // first time call
  const todos = await findAllByUserId(todo1.userId);

  expect(todos).toStrictEqual([todo1]);

  // second time call
  const todos2 = await findAllByUserId("fake-user-id");

  expect(todos2).toStrictEqual([todo1, todo2]);
});

test("deleteTodoById should delete the todo with the given id and user id", async () => {
  prismaMock.todo.delete.mockResolvedValue(todo1);

  const deletedTodo = await deleteTodoById(todo1.id, "fake-user-id");

  expect(deletedTodo).toStrictEqual(todo1);
  expect(prismaMock.todo.delete)
    .toHaveBeenCalledWith({
      where: { id: todo1.id, userId: "fake-user-id" },
    });
});

test("deleteTodoById should throw mock_not_found_error when todo is not found", async () => {
  prismaMock.todo.delete.mockRejectedValue(mock_not_found_error);

  await expect(deleteTodoById(999, "fake-user-id"))
    .rejects.toThrow(Prisma.PrismaClientKnownRequestError);
});
