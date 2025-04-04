# **Inventory Management Project - Node.js & MongoDB**

## **Project Setup Instructions**

1. Clone the repository and navigate to the project folder.
2. Initialize a Node.js project.
3. Install the required dependencies and dev dependencies.

---

## **Project Dependencies & Their Purpose**

### **Dev Dependencies**

- **nodemon** → Automatically restarts the server when file changes are detected.
- **prettier** → A code formatter for maintaining consistent code style.

### **Dependencies**

- **bcrypt** → Hashing passwords for authentication.
- **cloudinary** → Cloud-based storage for managing media (images/videos).
- **cookie-parser** → Middleware to parse cookies from incoming requests.
- **cors** → Middleware to enable Cross-Origin Resource Sharing.
- **dotenv** → Loads environment variables from a `.env` file.
- **express** → Web framework for building APIs and applications.
- **jsonwebtoken** → Library for signing and verifying JSON Web Tokens (JWT) for authentication.
- **mongodb** → MongoDB driver for Node.js to interact with the database.
- **mongoose** → ODM (Object Data Modeling) library for MongoDB.
- **mongoose-aggregate-paginate-v2** → Plugin to add pagination to MongoDB aggregation queries.
- **multer** → Middleware for handling file uploads in Node.js applications.

---

## **Server Setup**

The **Express server** is configured to start on a specified port and connects to MongoDB before running.

---

## **Express App Configuration**

- **CORS enabled** for handling cross-origin requests.
- **JSON & URL-encoded parsing** with request size limits.
- **Cookie parsing** for handling authentication tokens.
- **Static file serving** enabled for public files.

## **Database Connection Setup**

The database connection is handled using **Mongoose**, which connects the application to MongoDB Atlas using the `MONGO_URI` environment variable.

---
