# 🎵 Music Stream App

A Spotify-inspired full-stack music streaming web application that lets users log in with Google, explore music via Deezer, and enjoy a clean, modern UI.

---

## 🚀 Features

- 🎧 **Music from Deezer API** – Browse and play music from Deezer.
- 🔐 **Google Authentication** – Sign in using your Google account securely.
- 🛡️ **JWT Auth** – Authentication handled with JSON Web Tokens.
- 🧑‍💼 **User Dashboard** – Personalized dashboard for each user.
- 💻 **Responsive Design** – Works beautifully on all devices.
- 🎨 **Modern UI** – Built with Tailwind CSS for an elegant experience.

---

## 🛠️ Tech Stack

| Layer      | Technology                               |
|------------|------------------------------------------|
| **Frontend** | React, TypeScript, Tailwind CSS           |
| **Backend**  | Node.js, Express.js, MySQL, JWT, Google OAuth |
| **Music API**| Deezer API                              |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/music-stream-app.git
```

### 2. Install Dependencies

# For backend

```bash
cd backend
npm install
```

# For frontend
```bash
cd ../frontend
npm install
```
### 3. Environment Variables
```bash
port=5000
db_password="your db password"
JWT_SECRET="your jwt token"
GOOGLE_CLIENT_ID="your client ID"
GOOGLE_CLIENT_SECRET="your client secret"
```

### 4. Run the App
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

### 🔑 Authentication Flow
User clicks Login with Google.

Google OAuth 2.0 authenticates the user.

Server generates a JWT and sends it to the frontend.

The token is stored and used for subsequent authenticated requests.

