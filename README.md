# 🎵 Melodify Backend

Melodify is a **RESTful music streaming backend API** built with Node.js, Express.js, MongoDB, and JWT authentication.

It provides APIs for user authentication, music management, music uploads, and album management.

## 🚀 Features

* User registration and login
* JWT-based authentication
* Artist authorization
* Music upload using Multer and ImageKit
* Create, update, get, and delete music
* Create and manage albums
* Add songs to existing albums
* Get music and albums
* Get music and albums by ID
* Remove deleted music from albums automatically

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Multer
* ImageKit
* Postman

## 📂 Project Structure

```text
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── db/
└── services/
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/nandinibhagat01/melodify-backend
cd melodify-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env`

Add your MongoDB, JWT, ImageKit, and other required environment variables.

### 4. Start the server

```bash
npm start
```

The server will start on the configured port.

## 🔐 Environment Variables

The application uses environment variables for sensitive information such as:

* MongoDB connection string
* JWT secret
* ImageKit credentials
* Server port

> Never commit your `.env` file to GitHub.

## 📌 API

The API is organized into:

* **Authentication** — Register, Login, Logout
* **Music** — Upload, Create, Get, Update, Delete
* **Albums** — Create, Get, Add Music

All APIs have been tested using **Postman**.

## 👩‍💻 Author

**Nandini Bhagat**

Built as a backend project to practice Node.js, Express.js, MongoDB, authentication, file uploads, and REST API development.
