# 🎵 Music Stream App

A full-stack music streaming web application that lets users log in with Google, explore music via Deezer, and enjoy a clean, modern UI.
> 🎵 **Note:** Due to API limitations, Deezer only provides 30-second previews of tracks — full-length music is not available.
>
> 
> ⚠️ **CORS Warning:** When fetching data from the Deezer API, you may encounter CORS (Cross-Origin Resource Sharing) errors in the browser.  
> To temporarily bypass this, visit [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) and click "Request temporary access to the demo server".
>
>📝 **Note:** If you find any bugs or have suggestions, feel free to open an issue or reach out — feedback is always welcome!

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
| **Frontend** | **React**, **TypeScript**, **Tailwind CSS**, **React Redux**          |
| **Backend**  | **Node.js**, **Express.js**, **MySQL**, **JWT**, **Google OAuth** |
| **Music API**| Deezer API                              |

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ayhan219/Music.git
```

### 2. Install Dependencies

#### For backend

```bash
cd backend
npm install
```

#### For frontend
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

### 4. Find the sql dump file and use it
![image](https://github.com/user-attachments/assets/3f4c5ca6-313d-41b3-a827-2fa4daf7d59b)


### 5. Run the App
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

##  🔑 Authentication Flow
User clicks Login with Google.

Google OAuth 2.0 authenticates the user.

Server generates a JWT and sends it to the frontend.

The token is stored and used for subsequent authenticated requests.

##   ✨ Future Enhancements
📝 Profile

❤️ Like/favorite functionality

🔍 Advanced search filters

### Project Images

#### Home page
![image](https://github.com/user-attachments/assets/99da7b39-710e-4d97-8cdd-5fc68502e7d1)

#### Albums and Artists page
![image](https://github.com/user-attachments/assets/8059cfc4-d514-4982-84ab-dad5d5023d08)

#### Album page with music bar
![image](https://github.com/user-attachments/assets/437a087f-14c6-41e9-956b-b0e03e9f50f8)

#### Radios page
![image](https://github.com/user-attachments/assets/3e5e32ca-0353-4acd-b6d1-d97e467b9485)





