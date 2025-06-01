# 🗂️ Task Management Microservices Application

This project is a **microservices-based task management application** designed with scalability, resiliency, and best practices in mind. It consists of the following core services:

- **User Service**: Handles user registration, login, and profile management.
- **Task Service**: Manages task creation, retrieval, updating, deletion, and status changes.
- **Notification Service**: Listens to task events and logs notifications.

The system uses **Node.js**, **Express**, **PostgreSQL**, **Redis**, **JWT** for authentication, and **Docker** for containerization.

---

## 🧰 Technologies Used

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (hosted on Render or other providers)  
- **Caching/Event Bus**: Redis  
- **Authentication**: JSON Web Tokens (JWT)  
- **Containerization**: Docker, Docker Compose  

---

## 📁 Folder Structure


Service/
├── userService/
├── taskService/
├── notificationService/
├── env/
│ ├── userService.env
│ ├── taskService.env
│ ├── notificationService.env
├── docker-compose.yml
├── README.md


---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🔧 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/userTask.git
   cd userTask
2. Set up environment variables:
Create .env files in the env/ directory or directly in each service folder.

3. Provision external services:
--PostgreSQL Database (e.g. Render)
--Redis Cache Server

4. Edit environment variables:
Update all .env files with appropriate values:

# userService.env / taskService.env / notificationService.env
REDIS_URL=redis://<username>:<password>@<host>:<port>
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
JWT_SECRET=your_jwt_secret_key

5. Run the application:
docker compose up --build
# This command builds and starts all microservices along with PostgreSQL and Redis (if using local containers).

🔐 Authentication & Authorization

1. User Service:
Registers and authenticates users.
Returns a JWT token upon successful login.

2. Task Service:
Validates JWT tokens with User Service via /profile endpoint.
Only authorized users can access their tasks.


📝 API Endpoints

👤 User Service (/user-service)

POST /signup – Register a new user.
POST /login – Authenticate and receive a JWT.
GET /profile – Get user details (JWT required).

✅ Task Service (/task-service)
All endpoints require JWT in the Authorization header.

GET /tasks – List all tasks for the user.
POST /tasks – Create a new task.
PUT /tasks/:id – Update a task.
DELETE /tasks/:id – Delete a task.
PUT /tasks/:id/status – Mark a task as complete/incomplete.

🔔 Notification Service

Subscribes to task events via Redis pub/sub.
Logs task creation, update, or completion to the console.


🛠 Deployment Instructions

Provision a PostgreSQL database server instance.
Provision a Redis cache server instance.

Clone the repository onto the deployment server using Git:

git clone https://github.com/your-username/userTask.git
cd userTask

Update the environment variables in all .env files located in the env directory:

REDIS_URL=redis://<username>:<password>@<host>:<port>
Replace with Redis credentials.

DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>
Replace with PostgreSQL connection info.

Run the application:

docker compose up


🧪 Testing
You can use Postman or cURL to interact with the API.
A Postman collection is available in the repo (if provided) under docs/.

Make sure to:

Use JWT in the Authorization: Bearer <token> header.

Validate task routes using a registered and logged-in user.

📦 Environment Variables Summary
# PostgreSQL Database
DATABASE_URL=postgresql://username:password@host:port/dbname

# Redis
REDIS_URL=redis://username:password@host:port

# JWT
JWT_SECRET=your_jwt_secret_key


🤝 Contributing
Pull requests are welcome. For significant changes, open an issue to discuss the approach first.
