# SmartShelf 📚


SmartShelf is a MERN stack application designed to manage and explore books with ease. It includes both **Admin and User roles**, enabling features like book exploration, suggestions, and inventory management with a clean and responsive UI built using React and Tailwind CSS.

## 🚀 Features

### ✅ User Features
- Explore books categorized by genre
- Search books by title
- Genre-based browsing
- Suggest new books using a form
- Responsive and intuitive UI for smooth navigation

### 🛠️ Admin Features

- Secure admin login
- Admin Dashboard overview
- Add, update, and delete books
- Manage book inventory efficiently
- Manage Suggested books

### 🔐 Authentication & Authorization

- User and Admin authentication using **JWT**
- Role-based access control (**RBAC**) to protect sensitive routes
- Token and role management via `localStorage`

## 🖼️ Tech Stack

### 🧠 Frontend
- **React.js**
- **Tailwind CSS**
- **Axios**

### ⚙️ Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT based Auth with Role-based Access Control (RBAC)**
- **bcryptjs for password hashing**


## 📁 Folder Structure

```bash
SmartShelf/
├── backend/       # Node.js + Express server
├── frontend/      # React.js app
├── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/SmartShelf.git
cd SmartShelf
```

### 2. Set Up Environment Variable

In /backend/.env

```bash
PORT = 5000
MONGO_URL = your_mongodb_connecion_string
JWT_SECRET_KEY  = your_secret_key
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4.  Run the Project Locally

```bash
# Start the backend
cd backend
npm run dev

# Start the frontend
cd ../frontend
npm start
```

## 🧑‍💻 Author
Aayush Mor
- GitHub: [github.com/aayush-mor13](https://github.com/aayush-mor13)
- LinkedIn: [linkedin.com/in/aayushmor](https://www.linkedin.com/in/aayushmor)
