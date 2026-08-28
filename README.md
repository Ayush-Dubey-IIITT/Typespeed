⌨️ TypeSpeed

A full-stack typing speed website built with **FastAPI, Python, MySQL, JavaScript, HTML, and CSS**.

The project is currently under development, with more features planned for future versions.

🚀 Current Features

🔐 Authentication

- User signup and login
- Password hashing before storing passwords in the database
- Duplicate username/email prevention
- JWT-based authentication
- Protected user information using authentication tokens
- `.env` based secret-key management

👤 User Profile

- Profile page for authenticated users
- Displays the logged-in user's:
  - Username
  - Email
- Authentication-based profile icon
- Automatic redirection for unauthenticated users

🗄️ Database

- MySQL database integration
- SQLModel ORM
- User model with:
  - Auto-generated ID
  - Unique username
  - Unique email
  - Hashed password
- Database sessions handled through FastAPI dependencies

🌐 Frontend ↔ Backend

- Frontend connected to the FastAPI backend using `fetch()`
- JSON-based API communication
- CORS configured for local frontend development
- Backend errors displayed on the frontend

🛠️ Tech Stack

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

📁 Project Structure

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
