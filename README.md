# MERN Contact Management App

A full-stack Contact Management application built with the MERN stack (MongoDB, Express.js, React, Node.js) demonstrating core fundamentals and best practices for interview-ready code.

## Project Structure

```
project/
├── src/                          # Frontend (React)
│   ├── components/
│   │   ├── ContactForm.tsx      # Contact form with validation
│   │   └── ContactList.tsx      # Contact display and delete
│   ├── lib/
│   │   └── api.ts              # API service layer
│   ├── App.tsx                 # Main app component
│   ├── main.tsx
│   └── index.css
├── backend/                     # Backend (Express + MongoDB)
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── Contact.js         # Mongoose Contact schema
│   ├── routes/
│   │   └── contacts.js        # REST API endpoints
│   ├── server.js              # Express server
│   ├── .env                   # Backend environment variables
│   ├── .env.example
│   └── package.json
├── .env.local                 # Frontend environment variables (dev)
├── .env.example               # Frontend .env template
├── package.json               # Frontend dependencies
└── vite.config.ts            # Frontend build config
```

## Features

### Frontend (React + TypeScript)
- **Contact Form Component** with:
  - Client-side validation (name, email, phone)
  - Inline error messages
  - Disabled submit button when invalid
  - Success notification
  - Loading states

- **Contact List Component** with:
  - Responsive design (table on desktop, cards on mobile)
  - Delete functionality with confirmation
  - Loading and empty states
  - Sorted by newest first
  - Real-time UI updates (no page reload)

### Backend (Node.js + Express)
- **REST API Endpoints**:
  - `POST /api/contacts` - Create contact
  - `GET /api/contacts` - Fetch all contacts
  - `DELETE /api/contacts/:id` - Delete contact

- **MongoDB Integration**:
  - Mongoose schema with validation
  - Error handling and status codes
  - CORS enabled for frontend communication

## Tech Stack

**Frontend:**
- React 18 (functional components with hooks)
- TypeScript
- Tailwind CSS
- Vite (bundler)
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS middleware
- dotenv for environment variables

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with MongoDB URI:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contact_db
PORT=5000
```

5. Start the backend server:
```bash
npm start          # Production
npm run dev        # Development with auto-reload
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In the project root directory, install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. The `.env.local` file already points to the local backend:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or next available port)

## API Documentation

### Create Contact
```bash
POST /api/contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "message": "Optional message"
}

Response: 201 Created
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "message": "Optional message",
    "createdAt": "2025-...",
    "updatedAt": "2025-..."
  }
}
```

### Get All Contacts
```bash
GET /api/contacts

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "message": "Optional message",
      "createdAt": "2025-...",
      "updatedAt": "2025-..."
    }
  ]
}
```

### Delete Contact
```bash
DELETE /api/contacts/:id

Response: 200 OK
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": { ... }
}
```

## Validation Rules

### Name
- Required
- Minimum 2 characters
- Trimmed on submission

### Email
- Required
- Valid email format (regex validation)
- Stored as lowercase
- Trimmed on submission

### Phone
- Required
- Valid phone format
- Minimum 10 digits
- Supports various formats: +1 (555) 123-4567, 555-123-4567, etc.
- Trimmed on submission

### Message
- Optional
- Trimmed on submission

## Error Handling

The app includes comprehensive error handling:
- Client-side validation with inline error messages
- Server-side validation with proper HTTP status codes
- Try-catch blocks for async operations
- User-friendly error alerts
- Console logging for debugging

## Code Quality Features

- TypeScript for type safety
- Modular component structure
- Reusable API service layer
- Single Responsibility Principle
- Clean, readable code with proper naming
- No hardcoded values (environment variables)
- Proper loading and error states

## Running Tests

### Frontend Build
```bash
npm run build
```

Verifies TypeScript compilation and production bundle.

### Health Check
```bash
curl http://localhost:5000/api/health
```

## Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Set environment variable: `VITE_API_URL=<production_api_url>`
3. Deploy `dist` folder

### Backend (Heroku/Railway/Render)
1. Set environment variable: `MONGODB_URI=<your_mongo_uri>`
2. Deploy backend folder
3. Update frontend `VITE_API_URL` to point to production API

## Interview Notes

This project demonstrates:
- Full-stack development with MERN
- State management with React Hooks
- Form validation and error handling
- REST API design and implementation
- Database schema design
- Component composition
- API service abstraction
- TypeScript fundamentals
- Modern async/await patterns
- CORS and cross-origin requests
- Environment variable management
- Clean code practices

## License

MIT
