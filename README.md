# nextjs15-todo-example
GitHub Copilot Workspace generated sample todo app of next.js 15 with server actions

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Usage

To run the development server, use the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

To start developing, you can use the following commands:

```bash
npm run build
npm run start
```

For more information on how to use Next.js, you can refer to the [Next.js documentation](https://nextjs.org/docs).

## Starting PostgreSQL Dev Database

To start the PostgreSQL dev database locally using Docker, follow these steps:

1. Start the Docker containers:

```bash
docker-compose up
```

This will start the PostgreSQL dev database and make it available on port 5432.

## Connecting to PostgreSQL Dev Database

To confirm that you can connect to the PostgreSQL database in the terminal, you can use the `psql` command-line tool. Here are the steps:

1. Ensure that the PostgreSQL client is installed on your machine. You can install it using your package manager. For example, on Ubuntu, you can run:

```bash
sudo apt-get install postgresql-client
```

2. Use the following command to connect to the database:

```bash
psql -h localhost -p 5432 -U devuser -d devdb
```

3. When prompted, enter the password `devpassword`.

If the connection is successful, you will see the PostgreSQL prompt. You can then run SQL commands to interact with the database. For example, you can list the tables in the database with the command `\dt`.

## Prisma Setup

To set up Prisma in your project, follow these steps:

1. Install the required packages:

```bash
npm install prisma @prisma/client
```

2. Initialize Prisma in your project:

```bash
npx prisma init
```

3. Update the `prisma/schema.prisma` file with your database schema. For example:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  todos     Todo[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

4. Add the `DATABASE_URL` environment variable to the `prisma/.env` file:

```env
DATABASE_URL="postgresql://devuser:devpassword@localhost:5432/devdb"
```

5. Run the following command to generate the Prisma Client:

```bash
npx prisma generate
```

6. To seed the database with initial data, create a `prisma/seed.ts` file and add the following code:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      todos: {
        create: [
          { title: 'Todo 1 for User One' },
          { title: 'Todo 2 for User One' },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'User Two',
      todos: {
        create: [
          { title: 'Todo 1 for User Two' },
          { title: 'Todo 2 for User Two' },
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
```

7. Run the following command to apply the migrations and create the necessary tables in the database:

```bash
npx prisma migrate dev --name init
```

8. Run the seed script to populate the database with initial data:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

### Note

If you encounter an error stating that a folder called `prisma` already exists in your project when running `npx prisma init`, it is expected. The `prisma` folder and its contents have already been set up in this project. You can skip the `npx prisma init` step and proceed with the other steps.
