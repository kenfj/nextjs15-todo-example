# Technical Specifications for Todo App

## Architecture

The Todo App follows a client-server architecture. The client is built using Next.js, a React framework for server-rendered applications. The server-side logic is handled by Next.js server actions and Prisma ORM for database interactions. The database used is PostgreSQL, which stores user and todo data. The application is containerized using Docker for easy deployment and scalability.

## Tech Stack

- **Next.js**: Chosen for its ability to handle server-side rendering and static site generation, which improves performance and SEO.
- **React**: Used for building the user interface due to its component-based architecture and reusability.
- **Prisma**: An ORM for database interactions, chosen for its type safety and ease of use with TypeScript.
- **PostgreSQL**: A relational database used for storing user and todo data, chosen for its reliability and performance.
- **Docker**: Used for containerizing the application, which simplifies deployment and ensures consistency across different environments.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application, chosen for its flexibility and ease of use.
- **DaisyUI**: A component library for Tailwind CSS, used for building consistent and visually appealing UI components.
- **TypeScript**: Used for type safety and improved developer experience.
- **ESLint**: A tool for identifying and fixing linting issues in the codebase.
- **Jest**: A testing framework used for writing and running unit tests.
- **React Testing Library**: A library for testing React components, used for writing tests that resemble how users interact with the application.

## Data Models

### User

- **id**: Integer, primary key, auto-incremented.
- **email**: String, unique, not null.
- **name**: String, optional.
- **todos**: List of Todo items associated with the user.
- **createdAt**: DateTime, default to current timestamp.
- **updatedAt**: DateTime, updated automatically on modification.

### Todo

- **id**: Integer, primary key, auto-incremented.
- **title**: String, not null.
- **completed**: Boolean, default to false.
- **userId**: Integer, foreign key referencing User.
- **createdAt**: DateTime, default to current timestamp.
- **updatedAt**: DateTime, updated automatically on modification.

## API Design

Next.js server actions are used to handle API requests. Server actions allow us to define server-side logic directly within our components, eliminating the need for explicit API endpoints. This approach simplifies the codebase and improves performance by reducing the number of network requests.

## User Interface Design

### Design Guidelines

- **Consistency**: Use consistent colors, fonts, and spacing throughout the application.
- **Responsiveness**: Ensure the application is responsive and works well on different screen sizes.
- **Accessibility**: Follow accessibility best practices to ensure the application is usable by all users.

### Site Map

1. **Home Page**: Displays a list of all todo items.
2. **Create Todo Page**: Allows users to create a new todo item.
3. **Edit Todo Page**: Allows users to edit an existing todo item.
4. **User Profile Page**: Displays user information and their associated todo items.

### UI Details for Key Screens

#### Home Page

- **Header**: Displays the application title.
- **Todo List**: Displays a list of todo items with their title and completion status.
- **Add Todo Button**: A button to navigate to the Create Todo Page.

#### Create Todo Page

- **Form**: A form with fields for the todo title and a submit button.

#### Edit Todo Page

- **Form**: A form pre-filled with the existing todo details, allowing users to update the title and completion status.

#### User Profile Page

- **User Information**: Displays the user's email and name.
- **Todo List**: Displays a list of the user's todo items with their title and completion status.
