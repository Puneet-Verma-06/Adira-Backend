# Property Management Backend API

A RESTful API built with Node.js, Express, and MongoDB for property management system with authentication.

## Features

- User registration (signup)
- User login with JWT authentication
- Protected routes with middleware
- Password hashing with bcrypt
- Input validation
- MongoDB database integration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/property-db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# For Windows (if MongoDB is installed as a service)
net start MongoDB

# For Mac/Linux
mongod
```

### 4. Run the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/signup`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`

#### Logout
- **POST** `/api/auth/logout`

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── authController.js  # Authentication logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   └── User.js            # User schema
├── routes/
│   └── auth.js            # Authentication routes
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── README.md
└── server.js              # Entry point
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with middleware
- Input validation and sanitization
- Email format validation
- Password minimum length requirement

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Responses

Success responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```
