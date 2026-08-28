# ⌨️ TypeSpeed

A full-stack typing speed website built with **FastAPI, Python, MySQL, JavaScript, HTML, and CSS**.

The project is currently under development, with more features planned for future versions.

## 🚀 Current Features

### 🔐 Authentication

- User signup and login
- Password hashing before storing passwords in the database
- Duplicate username/email prevention
- JWT-based authentication
- Protected user information using authentication tokens
- `.env` based secret-key management

### 👤 User Profile

- Profile page for authenticated users
- Displays the logged-in user's:
  - Username
  - Email
- Authentication-based profile icon
- Automatic redirection for unauthenticated users

### 🗄️ Database

- MySQL database integration
- SQLModel ORM
- User model with:
  - Auto-generated ID
  - Unique username
  - Unique email
  - Hashed password
- Database sessions handled through FastAPI dependencies

### 🌐 Frontend ↔ Backend

- Frontend connected to the FastAPI backend using `fetch()`
- JSON-based API communication
- CORS configured for local frontend development
- Backend errors displayed on the frontend

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Python** | Backend programming |
| **FastAPI** | REST API / backend framework |
| **SQLModel** | ORM and database models |
| **MySQL** | Database |
| **PyJWT** | JWT authentication |
| **pwdlib** | Password hashing |
| **JavaScript** | Frontend logic & API communication |
| **HTML** | Frontend structure |
| **CSS** | Frontend styling |

## 📁 Project Structure

```text
TypeSpeed/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── ...
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── profile.html
│   ├── script.js
│   ├── login.js
│   ├── signup.js
│   ├── profile.js
│   └── style.css
│
├── .env
├── .gitignore
└── README.md
````

## ⚠️ About the Frontend

The **HTML and CSS portions of this project are vibecoded**.

The backend, database integration, authentication, API logic, JavaScript functionality, and overall application logic are **not vibecoded** and are being implemented manually while learning and understanding the underlying concepts.

## 🔮 Planned Features

This project is still actively being developed. More features will be added, including:

* ⌨️ Actual typing speed tests
* 📊 WPM and accuracy calculation
* 📈 Personal typing statistics
* 📝 Test history
* 🏆 Best-score tracking
* 👤 Expanded user profiles
* 🔒 Improved authentication/session handling
* 🚪 Logout functionality
* 📱 Better responsive design
* ☁️ Production deployment
* And more...

## 🎯 Goal

The goal of TypeSpeed is to build a **complete full-stack typing speed application** while learning and applying real-world concepts such as:

* REST APIs
* Authentication & authorization
* JWT
* Database design
* ORM usage
* Password security
* Frontend/backend communication
* Deployment

> **Status:** 🚧 Work in Progress — Version 2 is currently under development. More features coming soon.
