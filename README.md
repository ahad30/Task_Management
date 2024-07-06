### Project Overview

This project is a task management application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to create, read, update, and delete tasks. It also includes functionality for marking tasks as completed. The frontend is styled with Tailwind CSS and Material Tailwind, and state management is handled using Redux.

Deploy: https://task-management-ahad.netlify.app/

### Technologies Used
- **Frontend**: React, Redux, Tailwind CSS, Material Tailwind
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful API built with Express.js

### Setup and Run the Project Locally

#### Prerequisites
- Node.js (>= 14.x)
- MongoDB

#### Backend Setup
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_folder>/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   DB_USER=<your_db_user>
   DB_PASS=<your_db_password>
 
   ```

4. Start the backend server:
   ```sh
   nodemon index.js
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm run dev
   ```

4. Open your browser for backend and navigate to `http://localhost:3000`
Open your browser for frontend and navigate to `http://localhost:5173`
.

### API Endpoints Documentation

#### `GET /tasks`
- **Description**: Retrieve a list of all tasks.
- **Response**: 
  - Status: `200 OK`
  - Body: Array of task objects
- **Example**:
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "title": "Sample Task",
      "description": "This is a sample task description",
      "status": "Incomplete"
    },
    ...
  ]
  ```

#### `GET /tasks/:id`
- **Description**: Retrieve a specific task by its ID.
- **Parameters**: 
  - `id` (string, required): The ID of the task to retrieve.
- **Response**:
  - Status: `200 OK`
  - Body: Task object
- **Example**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Sample Task",
    "description": "This is a sample task description",
    "status": "Incomplete"
  }
  ```

#### `POST /tasks`
- **Description**: Create a new task.
- **Body**:
  - `title` (string, required): The title of the task.
  - `description` (string, required): The description of the task.
- **Response**:
  - Status: `201 Created`
  - Body: The created task object
- **Example**:
  ```json
  {
    "title": "New Task",
    "description": "This is a new task description"
  }
  ```

#### `PUT /tasks/:id`
- **Description**: Update an existing task by its ID.
- **Parameters**:
  - `id` (string, required): The ID of the task to update.
- **Body**:
  - `title` (string, optional): The new title of the task.
  - `description` (string, optional): The new description of the task.
  - `status` (string, optional): The new status of the task.
- **Response**:
  - Status: `200 OK`
  - Body: The updated task object
- **Example**:
  ```json
  {
    "title": "Updated Task",
    "description": "This is an updated task description",
    "status": "Complete"
  }
  ```

#### `PATCH /tasks/:id`
- **Description**: Mark a task as completed by its ID.
- **Parameters**:
  - `id` (string, required): The ID of the task to update.
- **Response**:
  - Status: `200 OK`
  - Body: The updated task object
- **Example**:
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Sample Task",
    "description": "This is a sample task description",
    "status": "Complete"
  }
  ```

#### `DELETE /tasks/:id`
- **Description**: Delete a task by its ID.
- **Parameters**:
  - `id` (string, required): The ID of the task to delete.
- **Response**:
  - Status: `200 OK`
  - Body: Confirmation message
- **Example**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

By following these instructions, you should be able to set up and run the project locally, and utilize the API endpoints for managing tasks.
