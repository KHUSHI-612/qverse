# Qverse (Auth-only minimal)

Working Signup + Login using MongoDB, JWT, React, Vite, Express.

## What you get
- Backend: Node.js + Express + Mongoose + JWT
- Frontend: React + Vite with Login and Signup pages

## Do I need to download MongoDB?
No, you can use MongoDB Atlas (free cloud) so you don't need to install MongoDB locally. If you prefer local, install MongoDB Community Server and set `MONGO_URI` to your local connection string (e.g. `mongodb://localhost:27017/qverse`).

### MongoDB Atlas (recommended)
1. Create an account at https://www.mongodb.com/atlas/database
2. Create a free cluster.
3. Create a database user (username/password) and allow access from your IP (or 0.0.0.0/0 for development).
4. Get your connection string (starts with `mongodb+srv://...`).
5. Replace `<username>`, `<password>`, and `<dbname>`.

## Setup

### 1) Backend
```bash
cd server
cp ENV_EXAMPLE.txt .env  # then edit .env
# Edit MONGO_URI to your Atlas connection string
# Set JWT_SECRET to a long random string
npm install
npm run start
```
- Server runs on http://localhost:5000
- Health check: GET http://localhost:5000/api/health

### 2) Frontend
```bash
cd ../client
npm install
npm run dev
```
- App runs on http://localhost:5173
- Env (optional): create `.env` and set `VITE_API_BASE=http://localhost:5000/api`

## API Endpoints
- POST `/api/auth/signup` → { name, email, password }
- POST `/api/auth/login` → { email, password }
- Response: `{ token, user: { id, name, email, role } }`

## File Layout
- `server/src/routes/auth.js`: signup/login routes
- `server/src/models/User.js`: Mongoose User model
- `server/src/server.js`: Express app, CORS, Mongo connection
- `client/src/pages/Signup.jsx` & `Login.jsx`: Auth pages
- `client/src/service/api.js`: Axios instance

## Notes
- Token is stored in `localStorage` under `qverse_auth`.
- CORS is enabled for `http://localhost:5173` by default.


