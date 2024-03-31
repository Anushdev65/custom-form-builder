# custom-form-builder

# Form Builder Application

## Description

This application enables organizations to build their custom forms easily. It offers a flexible interface for creating various types of forms which can be integrated into any organizational workflow.

## Installation Instructions

### Prerequisites

- Node.js version 18^ and npm 8^ must be installed on your machine. [Node.js Download Page](https://nodejs.org/en/download/)
- MySQL Workbench for database management. [MySQL Workbench](https://www.mysql.com/products/workbench/)

### Setup

1. **Clone the project**: Start by cloning the repository to your local machine.

2. **Install Dependencies**: Navigate to the project root folder and the frontend folder to install the dependencies using the command "npm i"

3. **Environment Variables**: The project uses environment variables for configuration. An example file `.env.example` is provided. Rename this file to `.env` and update the variables to match your environment.

### Database Configuration

1. Ensure MySQL Workbench is installed and set up on your machine.
2. Navigate to the `models` folder inside the `src` directory, and open the `index.js` file.
3. Configure the Sequelize instance with your database name, username, password, and host as shown below. Replace `"database"`, `"username"`, and `"password"` with your actual MySQL Workbench credentials.

```javascript
const sequelize = new Sequelize("database", "username", "password", {
  host: "host",
  dialect: "mysql",
});
-async function syncDatabase() {
  // await sequelize.sync({ alter: true }); "Uncomment this method and start the project to load tables inside your database "
}
## Use npm run dev command to start the project

## API Endpoints

The application exposes several RESTful endpoints that allow for managing users, forms, and form fields. Below is a list of available endpoints with their HTTP methods and brief descriptions.

### Authentication
- **Register User**
  - `POST http://localhost:8000/api/v1/auths/register`
  - Registers a new user.
- **User Login**
  - `POST http://localhost:8000/api/v1/user/login`
  - Authenticates a user and returns a token.
- **User Logout**
  - `PATCH http://localhost:8000/api/v1/auths/logout`
  - Logs out a user by invalidating the session token.

### Form Fields
- **Create/Get All Form Fields**
  - `POST http://localhost:8000/api/v1/form-fields`
  - Creates a new form field or retrieves all form fields if no post data is provided.
- **Update Form Field**
  - `PATCH http://localhost:8000/api/v1/form-fields/:id`
  - Updates an existing form field specified by its ID.
- **Delete Form Field**
  - `DELETE http://localhost:8000/api/v1/form-fields/:id`
  - Deletes a form field specified by its ID.
- **Get Specific Form Field**
  - `GET http://localhost:8000/api/v1/form-fields/:id`
  - Retrieves a specific form field by its ID.

### Forms
- **Create/Read All Forms**
  - `POST http://localhost:8000/api/v1/form`, `GET http://localhost:8000/api/v1/form`
  - Creates a new form or retrieves all forms if no post data is provided.
- **Update/Delete Form**
  - `PATCH http://localhost:8000/api/v1/form/:id`, `DELETE http://localhost:8000/api/v1/form/:id`
  - Updates or deletes a specific form by its ID.

Please replace `localhost:8000` with the actual server address if you are accessing the API from a different machine or if the server is deployed to a different environment.
```
