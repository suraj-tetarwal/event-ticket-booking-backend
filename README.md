# Event Ticket Booking Backend

A backend system for an event ticket booking platform where users can register, view events, and book tickets. The project focuses on building RESTful APIs, implementing authentication and role-based access control, and managing events and bookings. It uses Sequelize ORM with migrations for database schema management and follows a modular backend architecture for better scalability and maintainability.

## Project Status

This project is currently under development. Core modules like user authentication and basic APIs are implemented, and other modules such as event management, venue management, and booking system are being developed.

## Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MySQL
- Sequelize ORM

### Authentication
- JSON Web Token (JWT)

### Tools
- REST APIs
- Postman (API testing)

## Folder Structure

The project follows a modular architecture where each feature (auth, event, venue, booking) is organized into its own module containing routes, controllers, services, and validation logic.

```
event-ticket-booking-backend
│
├── migrations        # Database migration files (Sequelize CLI)
├── seeders           # Seed data for database
├── models            # Sequelize generated models
├── config            # Sequelize configuration
├── src
│   ├── app.js        # Configures the Express application, middlewares, and API routes
│   ├── server.js     # Entry point of the application that starts the server
│   ├── config        # Database connection configuration
│   ├── middleware    # Custom middlewares (error handler, authentication, role authorization)
│   ├── models        # Application models used for database queries
│   └── modules
│       ├── auth
│       │   ├── routes        # Defines API endpoints and maps them to controller functions
│       │   ├── controller    # Handles request and response logic for each API
│       │   ├── validation    # Contains request validation logic to ensure correct input data
│       │   └── services      # Contains business logic and database operations
│       ├── event
│       ├── venue
│       └── booking
│           ├── routes
│           ├── controller
│           ├── validation
│           └── services
└── node_modules
```

## Features / Modules

### Authentication & Access Control
- User registration
- User login
- JWT based authentication
- Role based authorization (Admin / User)

### Event Management
- Create events
- Update event details
- Delete events
- View available events

### Venue Management
- Create venues
- Manage venue details
- Associate venues with events

### Booking System
- Book tickets for events
- Prevent overlapping bookings
- View user bookings

### API Architecture
- Modular backend structure
- Request validation for APIs
- Centralized error handling middleware

## API Examples

### Authentication

POST /api/auth/register  
Register a new user

POST /api/auth/login  
Login user and return JWT token

---

### Venue Management

POST /api/venue  
Create a new venue (Admin only)

GET /api/venue  
Get list of all venues (Admin only)

GET /api/venue/:id
Get single venue (Admin only)

PUT /api/venue/:id  
Update venue details (Admin only)

DELETE /api/venue/:id  
Delete a venue (Admin only)

---

### Event Management

POST /api/event  
Create a new event (Admin only)

GET /api/event  
Get list of all events

GET /api/event/:id
Get single event

PUT /api/event/:id  
Update event details (Admin only)

DELETE /api/event/:id  
Delete an event (Admin only)

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/suraj-tetarwal/event-ticket-booking-backend.git
```

### 2. Navigate to the project folder

```
cd event-ticket-booking-backend
```

### 3. Install dependencies

```
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add the required environment variables such as database credentials and JWT secret.

### 5. Run database migrations

```
npx sequelize-cli db:migrate
```

### 6. Start the server

```
npm start
```

## Author

Suraj Tetarwal  
Full Stack/Backend Developer
