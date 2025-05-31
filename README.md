<!-- This project is a microservices-based task management application designed with scalability, resiliency, and best practices in mind. It comprises three primary services: -->

User Service: Handles user registration, login, and profile management.

Task Service: Manages task creation, retrieval, updating, deletion, and status changes.

Notification Service: Sends notifications upon task creation, updates, or completion.

The application leverages technologies like Node.js, Express, PostgreSQL, Redis, JWT for authentication, and Docker for containerization.

<!-- 🧰 Technologies Used -->
Backend: Node.js, Express.js

Database: PostgreSQL (hosted on Render)

Caching: Redis

Authentication: JSON Web Tokens (JWT)

Containerization: Docker, Docker Compose

 <!-- Folder Structure -->

Service/
├── userService/
├── taskService/
├── notificationService/
├── docker-compose.yml
├── README.md

<!-- 🚀 Getting Started -->
Prerequisites
Node.js v14 or higher

Docker

Docker Compose

Installation
Clone the repository:
git clone https://github.com/your-username/userTask.git
cd userTask
Set up environment variables:

Create a .env file in the root directory and add necessary environment variables. Refer to .env.example for guidance.

Build and run the services using Docker Compose:

docker-compose up --build
This command will build and start all services defined in the docker-compose.yml file.

Authentication & Authorization
Users can sign up and log in via the User Service.

Upon successful login, a JWT token is issued.

The Task Service uses middleware to authenticate requests by verifying the JWT token with the User Service's /profile endpoint.

📝 API Endpoints
User Service (/user-service)
POST /signup: Register a new user.

POST /login: Authenticate a user and return a JWT token.

GET /profile: Retrieve user profile information (requires JWT).

<!-- Task Service (/task-service) -->
GET /tasks: Retrieve all tasks for the authenticated user.

POST /tasks: Create a new task.

PUT /tasks/:id: Update an existing task.

DELETE /tasks/:id: Delete a task.

PATCH /tasks/:id/status: Change the status of a task.

Note: All Task Service endpoints require JWT authentication.

Notification Service
Listens to events from the Task Service and logs notifications to the console upon task creation, updates, or completion.
