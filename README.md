<div align="center"> 
  
  # 🛎️ FW-Guesthouse API 🛎️

A RESTful backend API for **FW-Guesthouse**, a web application for managing a guesthouse — rooms, services, events, and bookings.
Built with the **MERN stack** (MongoDB, Express, Node.js) as a final-year project (PFE) for my DUT in Génie Informatique at ESTE.

![Node](https://img.shields.io/badge/Node.js-000000?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-000000?logo=mongodb)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![JWT](https://img.shields.io/badge/JWT-black?logo=jsonwebtokens)

> Originally built as the backend for a two-person academic project. The frontend was handled separately and isn't included here — this repo is the API on its own.
> 
</div>

## ✨ Features

- **Authentication** — JWT-based register/login, password hashing, protected routes
- **Rooms management** — CRUD for room listings and details
- **Services management** — CRUD for guesthouse services
- **Events management** — CRUD for events hosted at the guesthouse
- **Bookings** — create, view, update, and cancel bookings
- **Email-verified bookings** — booking email verification via a tokenized link (needs upgrading to work)
- **Users** — profile management and user administration (admins only)
- **Environment config** — secrets and connection strings managed via `.env`

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB (Mongoose) |
| Auth | JWT + bcrypt |
| Email | crypto + Nodemailer |
| Other | dotenv, nodemon |

## 🏗️ Project Structure
```
FW-guesthouse/
├── backend/
| ├── config/ # DB connection and environment config
│ ├── controllers/ # Route handlers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API route definitions
│ ├── middleware/ # Auth, cors handling, error handling
│ |── utils/ # Email verification
| ├── .env.example
| ├── package.json
| ├── package-lock.json
| └── server.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas connection string
- npm

### Install

```bash
git clone git@github.com:bbotfatimezzahra/FW-Guesthouse.git
cd FW-Guesthouse/backend
mv .env.example .env
npm install
```
### Fill environment variables
### Run
```bash
npm run dev      # development (nodemon)
npm run start    #production
```

The API will be available at **http://localhost:3000**

## 📡 API Endpoints

### Users

| Method	| Endpoint	| Description	| Admins only |
|:--------:|:---------|:-----------|:--------:|
| GET	| /api/users |	List all admins	| ✅ |
| POST	| /api/users/register	| register new admin	| ❌ |
| POST	| /api/users/login	| login to admin account	| ❌ |
| GET	| /api/users/me	| get admin info	| ✅ |
| PUT	| /api/users/update	| update admin info	| ✅ |

### Rooms

| Method	| Endpoint	| Description	| Admins only |
|:--------:|:---------|:-----------|:--------:|
| GET	| /api/rooms	| List all rooms	| ❌ |
| GET	| /api/rooms/:id	| Get a single room	| ❌ |
| POST	| /api/rooms	| Create a room	| ✅ |
| PUT	| /api/rooms/:id	| Update a room	| ✅ |
| DELETE	| /api/rooms/:id	| Delete a room	| ✅ |

### Services

| Method	| Endpoint	| Description	| Admins only |
|:--------:|:---------|:-----------|:--------:|
| GET	| /api/services	| List all services	| ❌ |
| GET	| /api/services/:id	| Get a single service	| ❌ |
| POST	| /api/services	| Create a service	| ✅ |
| PUT	| /api/services/:id	| Update a service	| ✅ |
| DELETE	| /api/services/:id	| Delete a service	| ✅ |

### Events

| Method	| Endpoint	| Description	| Admins only |
|:--------:|:---------|:-----------|:--------:|
| GET	| /api/events	| List all events	| ❌ |
| GET	| /api/events/:id	| Get a single event	| ❌ |
| POST	| /api/events	| Create an event	| ✅ |
| PUT	| /api/events/:id	| Update an event	| ✅ |
| DELETE	| /api/events/:id	| Delete an event	| ✅ |

### Bookings

| Method	| Endpoint	| Description	| Admins only |
|:--------:|:---------|:-----------|:--------:|
| GET	| /api/bookings |	List bookings |	✅ |
| GET	| /api/bookings/:id |	Get a single booking | ✅ |
| POST	| /api/bookings |	Create a booking | ❌ |
| PUT	| /api/bookings/:id |	Update a booking |	✅ |
| DELETE	| /api/bookings/:id	| Cancel a booking	| ✅ |

## 🗺️ Roadmap

Features planned for future iterations:

- [ ] Dependency upgrade
- [ ] Image upload for rooms/events
- [ ] Booking availability logic
- [ ] Payment implementation
- [ ] Booking confirmation email after payment
- [ ] User management and Role permissions
