# UserProfileManager--with-role-based-auth


UserProfileManager is a web application project developed as part of my journey to learn and practice building RESTful APIs using Node.js, Express.js, and MySQL. This project allows you to perform various operations related to user profiles and data management.

## Features

- **User Authentication:** Secure user authentication using JWT tokens, allowing users to log in securely and access protected routes.

- **CRUD Operations:** Supports Create, Read, Update, and Delete operations for user profiles.

- **File Upload:** Provides the capability to upload files, making it versatile for handling user profile pictures or other attachments.

- **Route Protection:** Certain routes are protected and require authentication using JWT tokens for access.

## Technologies and Libraries Used

- **Node.js:** The project is built on the Node.js runtime, which allows you to run JavaScript on the server-side.

- **Express.js:** Express is a popular web application framework for Node.js. It simplifies the process of building robust and scalable APIs.

- **MySQL:** MySQL is used as the relational database to store user profile data. The `mysql` package is used to interact with the database.

- **bcrypt:** Secure password hashing and authentication in the login system.

- **jsonwebtoken (JWT):** JSON Web Tokens (JWTs) are employed for user authentication and authorization. The `jsonwebtoken` package helps generate and verify JWTs.

- **multer:** The `multer` package facilitates file uploading capabilities within the API.

- **express-fileupload:** This package is used to handle file uploads via POST requests in the API.

- **nodemon:** Nodemon is a development utility that monitors changes in your source code and automatically restarts the server, making the development process smoother.

## Learned
In the process of building this project, you've gained valuable experience in several areas:
- Creating a RESTful API with Express.js.
- Implementing user authentication and authorization using JWT tokens.
- Interacting with a MySQL database to perform CRUD operations.
- Securely hashing passwords using bcrypt for storage.
- Handling file uploads and processing them with multer and express-fileupload.
- Setting up a development environment with Nodemon for automatic server restarts during development.


## Usage

Here are some examples of how to use the API:

- **User Registration:** Create a new user account by sending a POST request to `/register`.

- **User Login:** Authenticate and log in by sending a POST request to `/login`.

- **Protected Routes:** Access protected routes by including a valid JWT token in the request headers.

- **CRUD Operations:** Use the API to create, retrieve, update, and delete user profiles.

- **File Upload:** Upload user profile pictures or attachments using the `/upload` route.
