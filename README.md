
# SyncStream

## Real-Time Multi-Display Video Synchronization System

## 🎯 Aim

The aim of SyncStream is to build a real-time video synchronization system where a central Controller can control video playback across multiple Displays simultaneously.

The backend acts as the authoritative source of playback state and uses Socket.IO to communicate playback commands and synchronization updates in real time.

---

## 🌐 Deployed Links

### Controller

[Open Controller](https://real-time-multi-display.vercel.app/login)

### Display

[Open Display](https://real-time-multi-display.vercel.app/display)

## 🔑 Demo Login

**Email:** `controller@gmail.com`

**Password:** `controller123`

---

## 🚀 Key Features

- Controller Login using JWT authentication
- Role-based authorization for Controller 
- Secure password verification using bcrypt
- Multiple Display connections
- Real-time connected Display count
- Play / Pause / Restart
- Forward 5 seconds / Backward 5 seconds
- Real-time video switching
- Automatic playback synchronization
- Playback drift detection and correction
- Display activation for browser autoplay restrictions
- Protected Controller route
- Controller Logout
- Real-time communication using Socket.IO

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT
- bcrypt

### Database
- MongoDB
- Mongoose

---

## 📁 Project Structure

```text
SyncStream/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Controller.jsx
│   │   │   └── Display.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── socket.js
│   │   │   └── displaySocket.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── sockets/
│   │   └── socketHandler.js
│   │
│   ├── state/
│   │   ├── clients.js
│   │   └── playbackState.js
│   │
│   ├── app.js
│   ├── server.js
│   └── .env
│
└── README.md

---

## 🚀 Installation

### Clone the repository

```bash
git clone <repository-url>
cd video-sync-system
```

---

### Install Client

```bash
cd client
npm install
```

---

### Install Server

```bash
cd ../server
npm install
```

---

## ▶ Running the Project

### Start Backend

```bash
cd server
npm run dev
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## 🌐 Environment Variables

### Server (.env)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
DISPLAY_KEY=your_display_key
PORT=3000
CLIENT_URL=http://localhost:5173
```

### Client (.env)

```env
VITE_SERVER_URL=http://localhost:3000
```

---


## 📸 Screens

### Controller
- Display count
- Playback controls
- Video selection

### Display
- Synchronized video playback
- Automatic synchronization
- Playback timeline

---

## 📌 Future Improvements
- Display pairing using temporary pairing codes
- Individual Display identification
- Display groups
- Display-specific controls
- Persistent Display configuration
- Admin dashboard
  


---

## 👨‍💻 Author

**Ashwani Singh**

B.Tech – Computer Science
