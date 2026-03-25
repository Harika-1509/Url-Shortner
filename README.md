# URL Shortener

A full-stack URL shortening application built with React (frontend) and Node.js/Express (backend) with MongoDB.

## Features

- Shorten long URLs into compact links
- View list of all shortened URLs
- Redirect to original URL via short link
- Responsive UI with Tailwind CSS

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios for API calls
- React Router for navigation

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- nanoid for generating short IDs
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd URL-SHORTNER
```

### 2. Backend Setup

```bash
cd server-app
npm install
```

Create a `.env` file in `server-app/` directory:

```
CONNECTION_STRING=mongodb+srv://<your-mongodb-connection-string>
```

Start the backend server:

```bash
npm run dev
```

Server will run on `http://localhost:5001`

### 3. Frontend Setup

```bash
cd ../client-app
npm install
```

Create a `.env` file in `client-app/` directory (if needed, but server URL is hardcoded):

```
VITE_SERVER_URL=http://localhost:5001/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173` (default Vite port)

## Usage

1. Open the frontend in your browser
2. Enter a long URL in the form
3. Click "Shorten URL" to generate a short link
4. View the shortened URL in the table below
5. Click on the short URL to redirect to the original

## API Endpoints

- `GET /api/shortUrl` - Get all shortened URLs
- `POST /api/shortUrl` - Create a new shortened URL
  - Body: `{ "fullUrl": "https://example.com" }`
- `GET /api/shortUrl/:shortId` - Redirect to original URL

## Project Structure

```
URL-SHORTNER/
├── client-app/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── helpers/
│   │   └── interface/
│   ├── public/
│   └── package.json
├── server-app/          # Node.js backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   ├── .env
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC
