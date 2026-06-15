# 💰 SpendSmart - Expense Tracker

A full stack expense tracking application
built with MERN Stack that helps you
track your income, expenses and monthly budget!

## 🔗 Live Demo
- Frontend: [Add after deployment]
- Backend: [Add after deployment]

---

## ✨ Features

- 🔐 JWT Authentication (Access + Refresh Token)
- 🔵 Google OAuth (Continue with Google)
- 💰 Add Income & Expenses
- 🗂️ Category wise expense tracking
- 🚨 Monthly Budget Limit with Warning
- 🔒 Secure & Protected Routes
- 🖼️ Profile Photo Upload

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Server Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Passport.js | Google OAuth |
| Cloudinary | File Upload |
| Multer | File Middleware |
| Bcrypt | Password Hashing |

### Frontend (Coming Soon!)
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| Chart.js | Data Visualization |
| Axios | API Calls |
| React Router | Navigation |

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/ankurgangwar4575-tech/expense-tracker
cd expense-tracker
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Create .env file in Backend folder
```
PORT=8000
MONGODB_URI=your_mongodb_uri

ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_secret
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
CALLBACK_URL=http://localhost:8000/api/users/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

### 4. Run Backend
```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth Routes
| Method | Route | Description |
|---|---|---|
| POST | /api/users/sign-up | Register user |
| POST | /api/users/sign-in | Login user |
| GET | /api/users/sign-out | Logout user |
| POST | /api/users/refresh-token | Refresh token |
| GET | /api/users/auth/google | Google OAuth |

### User Routes
| Method | Route | Description |
|---|---|---|
| GET | /api/users/get-user-info | Get profile |
| POST | /api/users/update-user-info | Update profile |
| PATCH | /api/users/update-profile-photo | Update photo |
| POST | /api/users/update-password | Update password |
| PATCH | /api/users/set-monthly-limit | Set budget |

### Expense Routes
| Method | Route | Description |
|---|---|---|
| POST | /api/expenses/add-expense | Add expense |
| GET | /api/expenses/get-all-expense | Get all |
| GET | /api/expenses/get-expense/:id | Get single |
| PATCH | /api/expenses/update-expense/:id | Update |
| DELETE | /api/expenses/delete-expense/:id | Delete |
| GET | /api/expenses/get-summary | Get summary |

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | JWT access token secret |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |

---

## 📁 Folder Structure

```
ExpenseTracker/
│
├── Backend/
│     ├── src/
│     │     ├── controllers/
│     │     │     ├── user.controller.js
│     │     │     └── expense.controller.js
│     │     ├── models/
│     │     │     ├── user.model.js
│     │     │     └── expense.model.js
│     │     ├── routes/
│     │     │     ├── user.routes.js
│     │     │     └── expense.routes.js
│     │     ├── middlewares/
│     │     │     ├── auth.middleware.js
│     │     │     └── multer.middleware.js
│     │     └── utils/
│     │           ├── cloudinary.js
│     │           ├── passport.js
│     │           ├── ApiError.js
│     │           ├── ApiResponse.js
│     │           └── AsyncHandler.js
│     ├── .env
│     └── server.js
│
└── Frontend/ (Coming Soon!)
```

---

## 🗺️ Upcoming Features

- 📊 Visual Charts & Dashboard
- 📱 Fully Responsive UI
- 🔍 Search & Filter Expenses
- 📅 Monthly Expense History
- 📤 Export to PDF/Excel

---

## 👨‍💻 Author

**Ankur Gangwar**
- LinkedIn → [https://www.linkedin.com/in/ankur-gangwar/]
- GitHub → [https://github.com/ankurgangwar4575-tech]

---

## ⭐ Support

If you like this project
please give it a ⭐ on GitHub!
It motivates me to build more! 😊