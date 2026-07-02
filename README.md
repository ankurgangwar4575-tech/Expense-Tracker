# SpendSmart 💸

SpendSmart is a full-stack expense tracker built with the MERN stack. It helps users sign up or sign in, connect with Google, manage income and expenses, track spending by category, set a monthly budget limit, and visualize financial activity with charts and summary cards.

## ✨ Features

- Email/password authentication with JWT access and refresh tokens
- Google OAuth login
- Add, update, view, and delete income or expense transactions
- Monthly budget limit with alerting when the limit is exceeded
- Category-based expense tracking and summaries
- Profile management with photo upload
- Protected routes and authenticated API requests
- Dashboard charts and recent transaction views

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB and Mongoose
- JSON Web Tokens
- Passport.js with Google OAuth 2.0
- Cloudinary for profile photo uploads
- Multer for multipart form handling
- bcrypt for password hashing
- cookie-parser, cors, and express-session

### Frontend

- React 19
- Vite
- React Router
- Axios
- Chart.js and react-chartjs-2
- Tailwind CSS 4

## 🗂️ Project Structure

```text
SpendSmart/
├── Backend/
│   ├── server.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── public/
└── Frontend/
	├── src/
	│   ├── components/
	│   ├── context/
	│   ├── pages/
	│   └── utils/
	└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB database
- Cloudinary account for image uploads
- Google OAuth credentials if you want to use Google sign-in

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd SpendSmart
```

### 2. Configure the backend

Create a `.env` file inside `Backend/` with the following values:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
SESSION_SECRET=your_session_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/users/auth/google/callback
```

### 3. Configure the frontend

Create a `.env` file inside `Frontend/` with:

```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Install dependencies

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 5. Run the app

Start the backend:

```bash
cd Backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd Frontend
npm run dev
```

The frontend will usually run on `http://localhost:5173` and the backend on `http://localhost:3000`.

## 📦 Available Scripts

### Backend

- `npm run dev` - start the server with nodemon
- `npm start` - start the production server

### Frontend

- `npm run dev` - start the Vite dev server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## 🔄 Main User Flows

- Register a new account or sign in with email/password
- Continue with Google for OAuth login
- Set a monthly budget limit from the profile page
- Add income or expense transactions from the dashboard or add expense page
- Edit or delete existing transactions from the all expenses page
- Review totals, balances, and category distribution on the dashboard

## 🔌 API Overview

### User routes

- `GET /api/users/auth/google`
- `GET /api/users/auth/google/callback`
- `POST /api/users/sign-up`
- `POST /api/users/sign-in`
- `GET /api/users/sign-out`
- `POST /api/users/refresh-token`
- `PATCH /api/users/update-profile-photo`
- `GET /api/users/get-user-info`
- `PATCH /api/users/update-user-info`
- `PATCH /api/users/update-password`
- `PATCH /api/users/set-monthly-limit`

### Expense routes

- `POST /api/expenses/add-expense`
- `PATCH /api/expenses/update-expense/:id`
- `DELETE /api/expenses/delete-expense/:id`
- `GET /api/expenses/get-expense/:id`
- `GET /api/expenses/get-all-expense`
- `GET /api/expenses/get-summary`

## 📝 Notes

- The frontend stores the access token and user profile in local storage.
- API calls are configured with credentials enabled so refresh-token flows can work.
- If Google OAuth is used in production, make sure the callback URL and CORS origin match your deployed domains.

## 🌐 Live Demo

- Frontend: https://spendsmart-inky-theta.vercel.app
- Backend: https://spend-smart-yz35.onrender.com

## 👨‍💻 Author

Ankur Gangwar

- LinkedIn: https://www.linkedin.com/in/ankur-gangwar/
- GitHub: https://github.com/ankurgangwar4575-tech
 