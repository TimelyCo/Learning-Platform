# 📚 Modular Learning Platform – MERN Stack Project

A full-stack modular learning platform built using **MongoDB, Express, React (Next.js), and Node.js**.  
It supports **Admin** to create structured courses and **Learners** to study, answer questions, and track progress.

---

## 🚀 Live Demo

🌐 Frontend: [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)  
🔗 Backend API: [https://your-render-backend.onrender.com](https://your-render-backend.onrender.com)

> _(Replace with real links after deployment)_

---

## ✨ Features

### 👤 Authentication
- JWT-based login
- Role-based access: `admin`, `learner`

### 🧑‍🏫 Admin Panel
- Create Courses
- Add Sections → Units → Chapters → Questions (MCQ/Fill/Text)

### 🎓 Learner Panel
- Browse enrolled courses
- View nested course content
- Attempt questions
- Submit chapter progress
- Resume last incomplete chapter
- See score and completion badges

---

## 🧰 Tech Stack

| Tech       | Usage               |
|------------|---------------------|
| **Next.js** | Frontend (React + Routing) |
| **Node.js + Express** | Backend API      |
| **MongoDB + Mongoose** | Database         |
| **Tailwind CSS** | Styling and Layout |
| **JWT**      | Auth tokens          |
| **react-hot-toast** | Notifications     |

---

## 🧪 API Endpoints

### Auth
- `POST /auth/register` — Register user
- `POST /auth/login` — Login and return token

### Admin
- `POST /admin/course` — Create new course
- `POST /admin/section/:courseId`
- `POST /admin/unit/:sectionId`
- `POST /admin/chapter/:unitId`
- `POST /admin/question/:chapterId`

### Learner
- `GET /learn/courses` — All courses
- `GET /learn/course/:id` — Nested course structure
- `POST /learn/progress` — Submit chapter score
- `GET /learn/progress/:courseId` — Fetch learner's progress

---

## 🛠 Setup Instructions (Local)

### 🔧 Backend

```bash
cd backend
npm install
# Create .env file
touch .env
```
Create .env file with:
```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```
Then start the server:

```bash
npm run dev
```

🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access: http://localhost:3000

Test Credentials:
```txt
# Admin
email: admin@example.com
password: 123456

# Learner
email: learner@example.com
password: 123456
```

📁 Folder Structure

```pqsql
├── backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── styles/
```

🙌 Acknowledgements

This project is submitted as part of the MERN Stack Assignment by EnglishBhashi.

👨‍💻 Author

Anmol Raturi
B.Tech CSE, Graphic Era Hill University
📍 Dehradun | 🛰️ MERN | ⚙️ DSA | 🎓 NSS & Debating Society
🔗 GitHub: github.com/anmolraturi
📧 Email: anmolraturi2003@gmail.com
