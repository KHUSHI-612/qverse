# Qverse

Qverse is a community-driven Q&A platform designed for developers to share knowledge, ask questions, and collaborate. Built with the MERN stack.

## 🚀 Features

- **User Authentication**: Secure Sign Up & Login.
- **Ask & Answer**: Create questions, provide answers.
- **Profile Management**: Manage user profiles.
- **Modern UI**: built with React and Vite.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT

## 🏁 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Atlas or Local)

### 1️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory. You will need to define the following variables:
- `PORT` (e.g., 5000)
- `MONGO_URI` (Your MongoDB connection string)
- `JWT_SECRET` (A secure secret key for signing tokens)

Start the server:

```bash
npm run dev
```

### 2️⃣ Frontend Setup

```bash
cd client
npm install
```

(Optional) Create a `.env` file in `client` if you need to configure the API base URL:
- `VITE_API_BASE` (Defaults to the backend URL)

Start the app:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## 📂 Project Structure

- `client/`: React frontend
- `server/`: Express backend
