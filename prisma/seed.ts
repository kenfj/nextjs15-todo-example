import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      id: 'user1-id',
      email: 'user1@example.com',
      name: 'User One',
      todos: {
        create: [
          { title: 'Todo 1 for User One', userId: 'user1-id' },
          { title: 'Todo 2 for User One', userId: 'user1-id' },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      id: 'user2-id',
      email: 'user2@example.com',
      name: 'User Two',
      todos: {
        create: [
          { title: 'Todo 1 for User Two', userId: 'user2-id' },
          { title: 'Todo 2 for User Two', userId: 'user2-id' },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
