# nextjs15-todo-example
GitHub Copilot Workspace generated sample todo app of next.js 15 with server actions

## Quick Start

```bash
npm install

npm run dev
npm run vitest:ui
npm run prisma:studio
```

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

9. Starting Prisma Studio

> The ultimate tool for exploring and editing data in your Prisma project.

```bash
npx prisma studio
# or
npm run prisma:studio

# http://localhost:5555/
```

### Note

If you encounter an error stating that a folder called `prisma` already exists in your project when running `npx prisma init`, it is expected. The `prisma` folder and its contents have already been set up in this project. You can skip the `npx prisma init` step and proceed with the other steps.

## Resetting the Database in Two Ways

How to reset database when edited `schema.prisma` during development

```bash
# Push the state from Prisma schema to the database during prototyping
# (db push does not interact with or rely on migrations)
npx prisma db push reset

# db push will trigger generators (no need to run npx prisma generate)
```

* seed script to populate the database with initial data:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
# or
npx prisma db seed
```

```bash
# Reset your database and apply all migrations (trigger generators/seed)
npx prisma migrate reset
# Are you sure you want to reset your database? All data will be lost. › (y/N)

# migrate reset will trigger generators and seed
```

## Typical Development Workflow with Prisma

After edit `schema.prisma`...

### prototyping

`npx prisma migrate reset` (one shot command) or

1. `npx prisma db push reset`
2. (optional) `npx prisma generate`
3. `npx prisma db seed`

### development

1. `npx prisma migrate dev --name init`
2. `npx prisma migrate dev --name add-some-field`
3. `npx prisma migrate status`

## Checking and Upgrading NPM Packages

To check for outdated packages, run the following command:

```bash
npm outdated
```

To upgrade all outdated packages, run the following command:

```bash
npm update
```

## Setup Vitest

* https://nextjs.org/docs/app/building-your-application/testing/vitest#manual-setup

1. Install the required packages:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

2. Create a `vitest.config.mts` file in the root of your project
3. Add a test script to your `package.json`
4. Add `tests/sample.test.ts`
5. Run the following command to execute your tests:

```bash
npx vitest run tests/sample.test.ts
```

## Setup Vitest for Prisma

* jest
    - https://www.prisma.io/docs/orm/prisma-client/testing/unit-testing
* vitest
    - https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
    - https://www.prisma.io/blog/testing-series-2-xPhjjmIEsM#set-up-vitest

1. Install the required package:

```bash
npm i -D vitest-mock-extended
```

2. Create `src/lib/__mocks__/prisma.ts`
3. Create `tests/fixtures/test-data.ts`
4. Create `tests/repositories/todo-repository.test.ts`
5. Run the following command to execute your tests:

```bash
npm run test
# or
npm t
```

## Setup Vitest Coverage and UI

```bash
# https://vitest.dev/guide/coverage
npm i -D @vitest/coverage-v8

# update vitest.config.mts

npm run vitest:coverage

# https://vitest.dev/guide/ui
npm i -D @vitest/ui

npm run vitest:ui
```

## React Testing Library

* Common mistakes with React Testing Library
    - https://qiita.com/kobanyan/items/126512ec3e8d76c538b3

## Check Errors in CI

```bash
# check compile errors
npm run tsc

# check lint errors
npm run lint

# run unit test
npm test
```

## ESLint Stylistic

* https://eslint.style/guide/migration
* https://eslint.style/guide/config-presets

```bash
npm i -D @stylistic/eslint-plugin

# add stylistic.configs.customize in eslint.config.mjs

# Note: next lint will not check tests directory
npx eslint
npx eslint --fix
```

## Setup Playwright

* https://nextjs.org/docs/app/building-your-application/testing/playwright
* https://playwright.dev/docs/intro#installation

```bash
npm init playwright
✔ Where to put your end-to-end tests? · e2e
✔ Add a GitHub Actions workflow? (y/N) · true
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true

npx playwright --version
# Version 1.51.1

npx playwright test

npx playwright show-report
# http://localhost:9323/
```

* sample commands:

```bash
npx playwright test
# Runs the end-to-end tests.

npx playwright test --ui
# Starts the interactive UI mode.

npx playwright test --project=chromium
# Runs the tests only on Desktop Chrome.

npx playwright test example
# Runs the tests in a specific file.

npx playwright test --debug
# Runs the tests in debug mode.

npx playwright codegen
# Auto generate tests with Codegen.
```

* Updating Playwright
    - https://playwright.dev/docs/intro#updating-playwright

```bash
npm install -D @playwright/test@latest
```

## Docker Playwright

* run Playwright scripts in Docker environment
    - https://playwright.dev/docs/docker

```bash
docker pull mcr.microsoft.com/playwright:v1.51.1-noble

docker run -it --rm --ipc=host mcr.microsoft.com/playwright:v1.51.1-noble /bin/bash
```

* sample configurations for common CI providers
    - https://playwright.dev/docs/ci#github-actions

```bash
docker compose build app

docker compose up app

# debug
docker run -it nextjs15-todo-example bash
```
