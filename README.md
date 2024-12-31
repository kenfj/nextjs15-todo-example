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

1. Build the Docker containers:

```bash
docker-compose build
```

2. Start the Docker containers:

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
