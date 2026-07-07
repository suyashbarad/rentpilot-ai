# 🏢 RentPilot AI

An AI-powered Rent Management System built with **Node.js, Express.js, MySQL, Docker, and GitHub Actions**. The project provides REST APIs for managing residential properties, tenants, rent payments, complaints, visitors, and notifications with secure JWT authentication.

---

## 🚀 Features

-  JWT Authentication
-  Building Management
-  Flat Management
-  Tenant Management
-  Rent Payment Management
-  Complaint Management
-  Visitor Management
-  Notification Management
-  Dashboard Analytics API
-  Global Search API
-  AI Insights API
-  Swagger API Documentation
-  Docker & Docker Compose Support
-  Cloud Deployment (Render + Aiven MySQL)
-  GitHub Actions CI/CD

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js

**Database**
- MySQL

**DevOps**
- Docker
- Docker Compose
- GitHub Actions

**Documentation**
- Swagger

**Deployment**
- Render
- Aiven MySQL

---

## 📂 Project Structure

```
backend/
├── config/
├── controllers/
├── middlewares/
├── routes/
├── utils/
├── swagger/
├── .github/workflows/
├── app.js
├── server.js
├── Dockerfile
├── docker-compose.yml
└── package.json
```

---

## ⚡ Getting Started

### Clone Repository

```bash
git clone https://github.com/suyashbarad/rentpilot-ai.git
cd rentpilot-ai/backend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5001

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rentpilot_ai

JWT_SECRET=your_secret
```

### Run Locally

```bash
npm run dev
```

### Run with Docker

```bash
If running locally gives error use run with docher ..

docker compose up --build
```

---

## 📖 API Documentation

Swagger UI:

```
http://localhost:5001/api-docs
```

Health Endpoints:

```
GET /health
GET /live
GET /ready
```

---

## 📊 Architecture

```
Client
   │
REST API
   │
Express Backend
   │
MySQL Database
   │
Docker
   │
Render Deployment
```

---

## 🎯 Learning Outcomes

This project demonstrates:

- REST API Development
- JWT Authentication
- MySQL Integration
- Docker & Docker Compose
- CI/CD with GitHub Actions
- Cloud Deployment
- API Documentation
- Backend Best Practices

---

##  #Author
**Suyash Sachin Barad**  
📍 Pune, Maharashtra, India  
🔗 [GitHub](https://github.com/suyashbarad) | [LinkedIn](https://www.linkedin.com/in/suyash-sachin-barad-796b6534b) | [HackerRank](https://www.hackerrank.com/profile/baradsuyash4)

---


⭐ If you found this project useful, consider giving it a star!
