# Task Manager – Full-Stack Web Application

A production-ready **Task Manager** built with React, Node.js, Express, and MongoDB. It supports user authentication (JWT), full CRUD for tasks, dashboard, search/filter, pagination, dark mode, and toast notifications.

---

## Project Overview

This application lets users register, log in, and manage their own tasks. Each user has a private task list with status (pending, in progress, completed), priority, due date, and search/filter and pagination on the task list. The UI is responsive (mobile and desktop) and includes a dark mode toggle.

---

## Features

### Core
- **User authentication**: Register, Login, JWT-based sessions, protected routes
- **Dashboard**: User-specific summary cards (total, completed, in progress, pending) and recent activity
- **Task CRUD**: Create, read, update, delete tasks with title, description, status, priority, due date
- **Form validation**: Required fields and error messages on frontend and backend
- **Error handling**: Backend try/catch, structured API error responses, frontend toasts
- **Responsive UI**: Mobile-first layout with sidebar (desktop) and hamburger menu (mobile)

### Bonus
- **Search & filter**: Search by title/description, filter by status on task list
- **Pagination**: Task list paginated (configurable limit)
- **Dark mode**: Toggle with persistence in `localStorage`
- **Toast notifications**: Success/error feedback via `react-hot-toast`
- **Role-based access**: User model includes `role` (user/admin); admin middleware available for future use

---

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React 18 (Hooks), Vite, Tailwind CSS, Axios, React Router, react-hot-toast |
| Backend  | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth     | JWT (jsonwebtoken), bcryptjs |
| Validation | express-validator (backend), custom validation (frontend) |

---

## Architecture (Text Diagram)

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   Pages      │  │  Context     │  │  Services (Axios)     │   │
│  │ Login, Reg,  │  │  Auth,       │  │  /api/* → Backend    │   │
│  │ Dashboard,   │  │  Theme       │  │  + JWT in header     │   │
│  │ TaskList,    │  │              │  │                      │   │
│  │ TaskForm     │  │              │  │                      │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘   │
│         │                 │                      │               │
│         └────────────────┴──────────────────────┘             │
│                              │                                    │
│                    REST API (JSON, JWT)                           │
└──────────────────────────────┼───────────────────────────────────┘
                               │
┌──────────────────────────────┼───────────────────────────────────┐
│                         SERVER (Node/Express)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   routes/    │  │ middleware/  │  │  controllers/        │   │
│  │ authRoutes   │  │ auth (JWT)   │  │  authController      │   │
│  │ taskRoutes   │  │ validate     │  │  taskController      │   │
│  │              │  │ errorHandler │  │                      │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘   │
│         │                 │                      │               │
│         └────────────────┴──────────────────────┘                 │
│                              │                                    │
│  ┌──────────────┐  ┌────────┴────────┐                           │
│  │ config/db.js │  │  models/        │  MongoDB (Mongoose)       │
│  │ Mongoose     │  │  User, Task     │                           │
│  └──────────────┘  └─────────────────┘                           │
└──────────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
project-root/
├── client/                 # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── layout/     # Layout, Navbar, Sidebar
│   │   ├── context/        # AuthContext, ThemeContext
│   │   ├── pages/          # Login, Register, Dashboard, TaskList, TaskForm
│   │   ├── services/       # api.js (Axios)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env.example
├── server/                 # Node backend
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── auth.js         # JWT protect, admin
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── index.js
│   ├── package.json
│   └── .env.example
└── README.md
```

---

## API Routes

### Auth
| Method | Endpoint             | Description        | Auth   |
|--------|----------------------|--------------------|--------|
| POST   | `/api/auth/register` | Register user      | No     |
| POST   | `/api/auth/login`    | Login, returns JWT  | No     |
| GET    | `/api/auth/me`       | Current user        | Bearer |

### Tasks
| Method | Endpoint              | Description           | Auth   |
|--------|------------------------|------------------------|--------|
| GET    | `/api/tasks`           | List tasks (paginated, search, filter) | Bearer |
| GET    | `/api/tasks/dashboard` | Dashboard stats + recent | Bearer |
| GET    | `/api/tasks/:id`       | Single task           | Bearer |
| POST   | `/api/tasks`           | Create task           | Bearer |
| PUT    | `/api/tasks/:id`       | Update task           | Bearer |
| DELETE | `/api/tasks/:id`       | Delete task           | Bearer |

**Query params for GET /api/tasks**: `page`, `limit`, `search`, `status`, `sort`.

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone and install

```bash
cd "d:\new project 11"

# Backend
cd server
npm install
cp .env.example .env
# Edit .env: set MONGODB_URI, JWT_SECRET

# Frontend
cd ../client
npm install
cp .env.example .env
# Optional: set VITE_API_URL if not using Vite proxy
```

### 2. Environment variables

**server/.env**
- `PORT` – Server port (default 5000)
- `MONGODB_URI` – MongoDB connection string (e.g. `mongodb://localhost:27017/task-manager` or Atlas URI)
- `JWT_SECRET` – Secret for signing JWTs (use a strong value in production)
- `JWT_EXPIRE` – Optional, e.g. `30d`
- `CLIENT_URL` – Optional, for CORS (e.g. `http://localhost:5173`)

**client/.env**
- `VITE_API_URL` – Leave as `/api` when using Vite proxy to backend; set to full backend URL when frontend is served separately.

### 3. Run locally

**Terminal 1 – Backend**
```bash
cd server
npm run dev
```
Server runs at `http://localhost:5000`.

**Terminal 2 – Frontend**
```bash
cd client
npm run dev
```
App runs at `http://localhost:5173`. Vite proxy forwards `/api` to `http://localhost:5000`.

### 4. Build for production

```bash
# Backend: no build step; run with node
cd server && npm start

# Frontend
cd client && npm run build
# Output in client/dist
```

---

## Deployment

### Backend (Render / Railway)

1. Create a new Web Service (Render) or project (Railway).
2. Connect the repo and set root to `server` (or the directory that contains `server`).
3. Set build command: `npm install` (or leave default).
4. Set start command: `npm start` (runs `node index.js`).
5. Add environment variables:
   - `MONGODB_URI` – MongoDB Atlas connection string
   - `JWT_SECRET` – Strong random secret
   - `CLIENT_URL` – Frontend URL (e.g. `https://your-app.vercel.app`) for CORS
   - `PORT` – Usually provided by the platform
6. Deploy. Note the backend URL (e.g. `https://your-api.onrender.com`).

### Frontend (Vercel)

1. Import the repo in Vercel.
2. Set root directory to `client`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable: `VITE_API_URL` = your backend API base URL (e.g. `https://your-api.onrender.com/api`).
6. Deploy.

After deployment, set the backend’s `CLIENT_URL` to the Vercel app URL so CORS allows the frontend.

---

## Testing & Stability

- **Routes**: All frontend routes are wired (Login, Register, Dashboard, Tasks, New Task, Edit Task); invalid paths redirect to `/`.
- **API**: All listed endpoints are implemented; tasks are scoped by `user` (JWT).
- **Loading states**: Dashboard, task list, and task form show spinners while loading.
- **Empty states**: Dashboard and task list show empty-state messages and links to create a task.
- **Toasts**: Success and error toasts used for auth and CRUD actions.

---

## Assumptions & Limitations

- **Roles**: `user` and `admin` exist on the User model; only `protect` middleware is used on task routes. Admin-only routes can be added with `admin` middleware.
- **MongoDB**: Designed for MongoDB; connection string must be set in `MONGODB_URI`.
- **JWT**: Stored in `localStorage`; consider httpOnly cookies for higher security in production.
- **Rate limiting**: Not included; consider adding for production.
- **File uploads**: Not implemented; tasks are text-only.

---

## License

MIT.
#   n e w - p r o j e c t - 1 1  
 #   n e w - p r o j e c t - 1 1  
 