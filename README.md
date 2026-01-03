# MERN Contact Management App

A simple full-stack contact management application built using MongoDB, Express, React (Vite), and Node.js.

## Tech Stack
- Frontend: React, TypeScript, Vite
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Deployment: Vercel (Frontend), Render (Backend)

## Features
- Create new contacts
- View all contacts
- Delete contacts
- Client-side and server-side validation
- REST API integration

## How to Run Locally

1. Clone the Repository
git clone <your-repository-url>
cd <project-folder-name>

## Live Links

### Backend
1. cd backend
2. npm install
3. Create a `.env` file and add:
   MONGODB_URI=your_mongodb_uri
   PORT=5000
4. npm run dev

### Frontend
1. npm install
2. Create `.env.local` in root:
   VITE_BACKEND_URL=http://localhost:5000/api
3. npm run dev

## Live Demo

- Frontend: https://contactappp-git-master-priyansh-mittals-projects.vercel.app/
- Backend API: https://contact-app-backend-g956.onrender.com/api/contacts

> Note: The backend is hosted on Render (free tier), so the first request may take a few seconds to respond.