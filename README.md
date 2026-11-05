# 🐂 TOUROS — Smart To-Do List

A modern, high-performance **MERN stack** productivity application inspired by the wild bull Pokémon **Tauros**. Built with an energetic, focused, and minimalist design aesthetic, **TOUROS** provides full task lifecycle management, instant search and filtering, real-time analytics, and persistent MongoDB database storage.

---

## 📸 Key Highlights

- **Aesthetic**: Deep charcoal (`#12161A`), dark forest green (`#0E2B1F`), warm cream (`#FAF8F3`), and golden yellow/amber (`#F59E0B`).
- **Logo & Emblem**: Bespoke geometric Tauros bull insignia with golden horns, determined brow, and the iconic triple forehead studs.
- **Task Analytics**: Real-time counters for Total, Completed, Pending, and Overdue tasks, accompanied by an animated completion progress bar.
- **CRUD Operations**: Create, Read, Update, Delete with confirmation, and toggle completion status without page reloads.
- **Smart Filtering & Search**: Instant filter chips (All, Completed, Pending, Overdue, High, Medium, Low Priority) + live title search + multi-criteria sorting.
- **Reliable Persistence**: Direct integration with local MongoDB (`mongodb://127.0.0.1:27017/touros`), viewable in MongoDB Compass.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, Tailwind CSS, Axios, Lucide React |
| **Backend** | Node.js, Express.js, Mongoose 8, dotenv, cors |
| **Database** | MongoDB Community Server (v9.0.4+), MongoDB Compass |
| **Architecture**| RESTful API with MVC pattern (Controllers, Models, Routes, Services) |

---

## 📂 Project Directory Structure

```text
T-Pro/
├── package.json
├── README.md
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection handler
│   ├── controllers/
│   │   └── taskController.js     # REST API business logic for Tasks
│   ├── models/
│   │   └── Task.js               # Mongoose schema for Task collection
│   ├── routes/
│   │   └── taskRoutes.js         # Express routing definitions
│   ├── .env                      # Environment config (PORT, MONGO_URI)
│   ├── package.json              # Backend dependencies & scripts
│   └── server.js                 # Express server bootstrap & middleware
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DeleteConfirmModal.jsx # Safe deletion confirmation dialog
    │   │   ├── EmptyState.jsx         # Contextual empty state illustrations
    │   │   ├── FilterBar.jsx          # Live search, filter chips, and sorters
    │   │   ├── Header.jsx             # Top bar with date and Add Task CTA
    │   │   ├── Logo.jsx               # Vector Tauros emblem & typography
    │   │   ├── Sidebar.jsx            # SaaS navigation and MongoDB status
    │   │   ├── StatsCards.jsx         # 4 counters + completion progress bar
    │   │   ├── TaskCard.jsx           # Task item card with priority & status
    │   │   ├── TaskModal.jsx          # Create & Edit task modal dialog
    │   │   └── Toast.jsx              # Floating notification feedback
    │   ├── services/
    │   │   ├── api.js                 # Axios instance with interceptors
    │   │   └── taskService.js         # Task API integration service
    │   ├── App.jsx                    # Root view & state coordination
    │   ├── index.css                  # Tailwind directives & custom CSS
    │   └── main.jsx                   # React DOM root entry
    ├── index.html                     # HTML5 template with custom fonts
    ├── package.json                   # Frontend dependencies & scripts
    ├── postcss.config.js              # PostCSS plugins (Tailwind, Autoprefixer)
    ├── tailwind.config.js             # Tauros color palette & design tokens
    └── vite.config.js                 # Vite dev server and proxy config
```

---

## 🗄️ MongoDB Database Design

- **Database Name**: `touros`
- **Collection Name**: `tasks`
- **Connection URI**: `mongodb://127.0.0.1:27017/touros`

### Task Schema

| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `String` | Yes | — | Task title (trimmed, max 150 chars) |
| `description` | `String` | No | `""` | Additional notes or requirements |
| `priority` | `String` | Yes | `"Medium"` | Enum: `['Low', 'Medium', 'High']` |
| `deadline` | `Date` | No | `null` | Target completion date |
| `completed` | `Boolean` | Yes | `false` | Completion status flag |
| `createdAt` | `Date` | Yes | `Date.now` | Creation timestamp |

---

## 🚀 Installation & Running Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Community Server installed and running locally on port `27017`

### 1. Start MongoDB Community Server
If MongoDB is not already running as a service, start it via Homebrew:
```bash
brew services start mongodb-community
```
Or directly:
```bash
mongod --config /opt/homebrew/etc/mongod.conf
```

### 2. Setup and Start Backend
```bash
cd backend
npm install
npm start
```
The backend server runs at `http://localhost:5001`.
- Health check: `http://localhost:5001/api/health`
- Tasks endpoint: `http://localhost:5001/api/tasks`

### 3. Setup and Start Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Retrieve all tasks | Supports `?search=...`, `?status=...`, `?priority=...`, `?sort=...` |
| `GET` | `/api/tasks/:id` | Retrieve single task by ID | — |
| `POST` | `/api/tasks` | Create new task | `{"title": "Charge Forward", "priority": "High", "deadline": "2026-11-10T18:00:00Z"}` |
| `PUT` | `/api/tasks/:id` | Update existing task | `{"title": "Updated", "priority": "Medium", "completed": true}` |
| `PATCH`| `/api/tasks/:id/status` | Update task status | `{"completed": true}` (or toggle if body empty) |
| `DELETE`| `/api/tasks/:id` | Delete a task | — |
| `GET` | `/api/health` | Service health status | — |

---

## 🧭 Visualizing in MongoDB Compass

1. Open **MongoDB Compass**.
2. Connect to the default URI: `mongodb://127.0.0.1:27017`.
3. In the left database list, locate and click the **`touros`** database.
4. Select the **`tasks`** collection to view, filter, and inspect persisted documents.

---

## ✅ Feature Verification Checklist

- [x] **Database Connectivity**: Connected to local MongoDB Community Server at `mongodb://127.0.0.1:27017/touros`.
- [x] **Backend REST API**: Complete Express controllers for GET, POST, PUT, PATCH, and DELETE.
- [x] **Data Validation**: Enforced required titles, priority enums (`Low`, `Medium`, `High`), and date parsing.
- [x] **Frontend Architecture**: React 18 with Vite, clean components, custom hooks, and Tailwind CSS.
- [x] **Task Creation (CREATE)**: Interactive modal with title, description, priority selector, date picker, and quick shortcuts.
- [x] **Task Reading (READ)**: Dynamic card rendering, loading spinner, and contextual empty state illustrations.
- [x] **Task Update (UPDATE)**: Edit modal pre-filled with existing data, updating MongoDB and UI instantly.
- [x] **Task Deletion (DELETE)**: Safe confirmation modal before permanent removal from the database.
- [x] **Status Toggling (STATUS)**: Instant one-click toggle between completed and pending with visual strikethrough.
- [x] **Live Search**: Instant keyword search on task titles and descriptions.
- [x] **Multi-Criteria Filtering**: Filter by All, Completed, Pending, Overdue, High, Medium, and Low.
- [x] **Sorting**: Sort by Newest, Oldest, Soonest Deadline, Furthest Deadline, and Priority.
- [x] **Tauros Theme & Branding**: Deep charcoal, forest green, warm cream, and gold palette with original bull emblem.
- [x] **Responsive Layout**: Adapts gracefully across desktop, tablet, and mobile screens.

