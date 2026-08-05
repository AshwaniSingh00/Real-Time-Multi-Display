
A real-time video synchronization system built with **React, Node.js, Express, and Socket.IO**. The application allows a controller to manage playback across multiple connected display clients, ensuring all displays stay synchronized.

---

## ✨ Features

### 🎮 Controller
- Play video
- Pause video
- Restart video
- Forward 5 seconds
- Backward 5 seconds
- Change video for all displays
- View connected display count

### 📺 Display
- Receives commands in real time
- Automatically synchronizes playback
- Supports video switching
- Automatically syncs when a new display joins
- Drift detection and correction

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Socket.IO Client
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Socket.IO

---

## 📂 Project Structure

```
video-sync-system/
│
├── client/
│   ├── src/
│   ├── public/
│   │   └── videos/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── sockets/
│   │   ├── state/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

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
PORT=3000
CLIENT_URL=http://localhost:5173
```

### Client (.env)

```env
VITE_SERVER_URL=http://localhost:3000
```

---

## 🎯 How It Works

1. Displays connect and register with the server.
2. The controller sends playback commands.
3. The server maintains the authoritative playback state.
4. Commands are broadcast to all connected displays.
5. Displays periodically report playback status.
6. The server detects playback drift and synchronizes displays.
7. Newly connected displays automatically receive the current playback state and join the session seamlessly.

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

## 🔄 Socket Events

### Client → Server

- register
- play
- pause
- restart
- seek
- forward
- backward
- playback-status
- change-video

### Server → Client

- play
- pause
- restart
- seek
- sync
- display-count
- change-video

---

## 📌 Future Improvements

- Video upload from controller
- URL-based video streaming
- Authentication
- Room support
- Volume control


---

## 👨‍💻 Author

**Ashwani Singh**

Built as a real-time synchronization assignment using Socket.IO.
