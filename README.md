# Task Manager
A web-based application designed to help users efficiently manage their tasks. This project includes both backend and frontend components to provide a seamless task management experience.

## Table of Contents
- Features
- Project Structure
- Installation
  - Backend Setup
  - Frontend Setup
- Usage 
- API Endpoints
- Contributing
- License

## Features
- User Authentication: Secure login and registration system.
- Task Management: Create, read, update, and delete tasks.
- Responsive Design: Accessible on both desktop and mobile platforms.

## Project Structure
The repository is divided into two main directories:
- **`backend/`**: Contains the server-side code, including API endpoints and database configurations.
- **`frontend/`**: Contains the client-side code, built with modern web technologies to provide an interactive user interface.

## Installation
To set up the project locally, follow these steps:

### Backend Setup
1. Clone the repository:
   git clone https://github.com/vighnesh-shinde-18/task-manager.git
   cd task-manager
   
3. Navigate to the backend directory:
   cd backend
   
5. Install the required dependencies:
   npm install
   
7. Set up environment variables:
   - Create a `.env` file in the `backend/` directory with the following content:
     PORT=5000
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     
8. Start the backend server:
   npm start
   The backend server should now be running on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   cd ../frontend
   
2. Install the required dependencies:
   npm install
   
3. Start the frontend application:
   npm start
   
   The frontend application should now be running on `http://localhost:3000`.

## Usage
Once both the backend and frontend servers are running:
1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new account or log in with existing credentials.
3. Start managing your tasks by adding, editing, or deleting them as needed.

## API Endpoints
The backend API provides the following endpoints:

### Authentication
- `POST /api/auth/register` – Register a new user.
- `POST /api/auth/login` – Authenticate an existing user.

### Task Management
- `GET /api/tasks` – Retrieve all tasks for the authenticated user.
- `POST /api/tasks` – Create a new task.
- `PUT /api/tasks/:id` – Update an existing task.
- `DELETE /api/tasks/:id` – Delete a task.

> **Note:** All task-related endpoints require a valid JWT token in the `Authorization` header.

## Contributing
Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:
   git checkout -b feature-name
    
3. Make your changes and commit them with descriptive messages.
4. Push to your forked repository:
   git push origin feature-name
  
5. Open a pull request detailing the changes you've made.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

