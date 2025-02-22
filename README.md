# My Next.js Project

A full-stack web application built with **Next.js**, **TypeScript**, **TailwindCss** and **MongoDB**.

## 🚀 Project Setup & Installation Guide

### 📌 Prerequisites
Ensure you have the following installed before proceeding:

- **Node.js** (Recommended: v18.x or later)
- **MongoDB** (Cloud: MongoDB Atlas or Local: MongoDB Community) 
---

## 📥 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mehedi4467/employee-management-system.git
cd employee-management-system
```

### 2️⃣ Install Dependencies
Using npm:
```bash
npm install
```

---

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

## 🚀 Running the Project

### 🔹 Start the Development Server
Using npm:
```bash
npm run dev
```

The project will be available at **[http://localhost:3000](http://localhost:3000)**.

---

## 🛠️ Build & Run in Production

### 1️⃣ Build the Application
Using npm:
```bash
npm run build
```

### 2️⃣ Start the Production Server
Using npm:
```bash
npm run start
```
---

## 📝 Project Structure
```bash
📂 your-project/
│── 📁 components/      # Reusable UI components
│── 📁 pages/           # Next.js pages (API & Frontend routes)
│── 📁 lib/             # Utility functions (e.g., database connection)
│── 📁 public/          # Static assets (images, icons)
│── 📁 styles/          # Global CSS / Tailwind CSS
│── 📄 .env             # Environment variables
│── 📄 next.config.js   # Next.js configuration
│── 📄 tsconfig.json    # TypeScript configuration
│── 📄 package.json     # Dependencies and scripts
```

---

## ✅ API Routes (Example)
Your API routes are inside `pages/api`. Example:

- **GET Employees** → `/api/get-employee?page=&search=&joiningDate=`
- **PATCH Employees** → `/api/submit-employee`
- **DELETE Employee** → `/api/delete-employee?id=`

---

## 👨‍💻 Author
**MD Mehedi Hassan** – [GitHub](https://github.com/Mehedi4467)

---

Happy coding! 🚀🎯

