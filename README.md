# 🗂️ Task Management Microservices Application

This project is a **microservices-based task management application** designed with scalability, resiliency, and best practices in mind. It consists of the following core services:

- **User Service**: Handles user registration, login, and profile management.
- **Task Service**: Manages task creation, retrieval, updating, deletion, and status changes.
- **Notification Service**: Listens to task events and logs notifications.

The system uses **Node.js**, **Express**, **PostgreSQL**, **Redis**, **JWT** for authentication, and **Docker** for containerization.


## 🧰 Technologies Used

- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (hosted on Render)  
- **Caching/Event Bus**: Redis  
- **Authentication**: JSON Web Tokens (JWT)  
- **Containerization**: Docker, Docker Compose  


## 📁 Folder Structure  
    Service/ 
    ├── userService/               
    ├── taskService/              
    ├── notificationService/      
    ├── env/                       
    │   ├── userService.env
    │   ├── taskService.env
    │   ├── notificationService.env
    ├── docker-compose.yml         
    ├── README.md                 


## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)


### 📝 API Endpoints

1. 👤 **User Service**
    ```   
    POST /signup – Register a new user
    POST /login – Authenticate and receive a JWT
    GET /profile – Get user details (JWT required)
    ```

2. ✅ **Task Service**

    All endpoints require JWT in the Authorization header.
    ```
    GET /tasks – List all tasks for the user
    POST /tasks – Create a new task
    PUT /tasks/:id – Update a task
    DELETE /tasks/:id – Delete a task
    PUT /tasks/:id/status – Mark a task as complete/incomplete
    ```

3. 🔔 **Notification Service**

    Subscribes to task events via Redis pub/sub.
    
    Logs task creation, update, or completion events to the console.


### 🛠️ Deployment Instructions

1. Provision a PostgreSQL database server instance.

2. Provision a Redis cache server instance.

3. Clone the repository onto the deployment server using Git:

    ```bash
    git clone https://github.com/archi999/userTask.git
    cd userTask
    ```

4.  Update the environment variables in all .env files located in the env/ directory as follows:

    Redis Configuration
    ```    
    REDIS_URL=redis://<username>:<password>@<host>:<port>

    (Replace <username>, <password>, <host>, and <port> with the credentials of the Redis instance 
    created in step 2.)
    ```
    
    PostgreSQL Configuration
    ```
    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<db_name>

    (Replace <username>, <password>, <host>, <port>, and <db_name> with the connection details of the PostgreSQL instance created in step 1.)
    ```

6. Run the application using Docker Compose:
    ```bash
    docker compose up --build
    ```

### 🧪 Testing
    
- Use provided Postman collection for API testing purpose.
