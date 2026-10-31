# Humanova — Community Event Platform

Humanova is a community-focused event platform that helps people discover, create, and participate in local social-service activities. It brings volunteers and organizers together to make positive changes in their communities.

## 🌐 Live Website

**[Visit Humanova — Live Demo](https://humanova7.vercel.app/)**

## ✨ Features

- **Discover Events:** Browse upcoming community events and explore event details.
- **Search & Filter:** Find events by keyword or event category.
- **Create Events:** Authenticated users can create community events.
- **Manage Events:** Update and delete events created by users.
- **Join Events:** Participate in events and view joined events.
- **My Events:** Keep track of events you have created.
- **Authentication:** Sign up and sign in using email/password or Google.
- **User Profile:** View account information.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Theme Support:** Light and dark appearance options.
- **Notifications:** User-friendly toast notifications and confirmation dialogs.

## 🧰 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Base UI
- Lucide React
- React Hot Toast
- SweetAlert2

### Authentication & Database

- Better Auth
- MongoDB
- JWT Authentication
- Google OAuth

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── events/
│   ├── login/
│   ├── register/
│   ├── profile/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── events/
│   ├── home/
│   ├── layout/
│   ├── shared/
│   └── ui/
├── context/
├── hooks/
├── lib/
└── types/
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- MongoDB database access
- Humanova backend API

### 1. Clone the Repository

```bash
git clone https://github.com/mdsolimansikder7/assignment-08-client.git

cd assignment-08-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory.

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string
DB_NAME=humanova

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the example values with your actual credentials. Never commit `.env.local` or expose secret values.

### 4. Start the Backend

Start the separate Humanova backend API and make sure its MongoDB connection and authentication configuration are correct.

The frontend communicates with the backend using `NEXT_PUBLIC_API_URL`.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔐 Authentication & API

Humanova uses Better Auth for authentication.

Authentication features include:

- Email and password authentication
- Google OAuth login
- JWT token generation
- Protected API requests

Authenticated API requests include a JWT Bearer token.

### Event API Operations

The frontend API client supports:

- Get all events
- Get event details
- Create a new event
- Update an existing event
- Delete an event
- Get events created by the current user
- Join an event
- Check event joining status
- Get joined events

Protected backend routes should validate JWT tokens before allowing authenticated operations.

## 🌐 Deployment

The frontend is deployed using [Vercel](https://vercel.com/).

1. Import the GitHub repository into Vercel.
2. Configure the required environment variables.
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend API URL.
4. Set `BETTER_AUTH_URL` to your production frontend URL.
5. Configure Google OAuth authorized origins and redirect URLs.
6. Configure backend CORS to allow your frontend domain.
7. Deploy and test authentication and event operations.

Never expose MongoDB credentials, OAuth secrets, or authentication secrets in client-side code.

## 🔗 Related Repositories

- **Frontend:** [Humanova Client](https://github.com/mdsolimansikder7/assignment-08-client)
- **Backend:** [Humanova Server](https://github.com/mdsolimansikder7/assignment-08-server)

## 👨‍💻 Author

**Md. Soliman Sikder**

- GitHub: [@mdsolimansikder7](https://github.com/mdsolimansikder7)

---

<p align="center">
  Built to bring communities together through meaningful events. 💚
</p>
