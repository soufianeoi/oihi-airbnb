<div align="center">

# 🏠 Oihi AirBNB

### A Full-Stack Hotel Booking Platform Built with React & Node.js

[![CI/CD](https://github.com/soufianeoi/oihi-airbnb/actions/workflows/ci.yml/badge.svg)](https://github.com/soufianeoi/oihi-airbnb/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/soufianeoi/oihi-airbnb?style=social)](https://github.com/soufianeoi/oihi-airbnb/stargazers)

**Real hotels. Real reviews. Real booking experience.**

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Smart Search** | Search any city worldwide — auto-appends "hotels" for better results |
| 🗺️ **Interactive Map** | Google Maps integration with markers, info windows, and bounds fitting |
| ⭐ **Real Ratings** | Live Google Maps ratings, reviews, and business hours |
| 📱 **Responsive** | Works perfectly on desktop, tablet, and mobile |
| ❤️ **Favourites** | Save properties to your favourites (persisted in localStorage) |
| 🔐 **Authentication** | Register/Login system with profile management |
| 📅 **Booking System** | Complete booking flow with price breakdown and validation |
| 🏷️ **Smart Pricing** | Dynamic price estimation based on property ratings |
| 🌙 **About Page** | Professional About Us modal |
| 📍 **Map Links** | Direct links to Google Maps for each property |

## 🛠️ Tech Stack

### Frontend
- **React 18** — Component-based UI
- **React Google Maps API** — Map integration
- **Axios** — HTTP client
- **Custom Hooks** — useClickOutside, useSearchForm, useGoogleMap, useBookingForm

### Backend
- **Node.js + Express** — REST API
- **Google Places API (New)** — Real hotel data
- **JSDoc** — Full documentation on every function
- **MVC Architecture** — Controllers, routes, middleware, models

### DevOps
- **GitHub Actions** — CI/CD pipeline
- **ESLint** — Code linting
- **Git Branches** — Feature-based workflow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- Google Maps API key ([get one free](https://console.cloud.google.com))

### 1. Clone the repo
```bash
git clone https://github.com/soufianeoi/oihi-airbnb.git
cd oihi-airbnb
```

### 2. Setup Backend
```bash
cd oihi-airbnb-backend
cp .env.example .env
# Edit .env and add your GOOGLE_MAPS_API_KEY
npm install
node server.js
```
Server runs on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd ../oihi-airbnb-frontend
cp .env.example .env
# Edit .env and add your REACT_APP_GOOGLE_MAPS_API_KEY
npm install
npm start
```
App runs on `http://localhost:3000`

### 4. Open your browser
Navigate to `http://localhost:3000` and start exploring!

## 📁 Project Structure

```
oihi-airbnb/
├── .github/workflows/     # CI/CD pipeline
├── oihi-airbnb-backend/
│   └── src/
│       ├── config/        # Environment configuration
│       ├── controllers/   # Business logic
│       ├── middleware/     # Error handling, logging, validation
│       ├── models/        # Data models
│       ├── routes/        # API endpoints
│       └── utils/         # Helpers, Google Places API
├── oihi-airbnb-frontend/
│   └── src/
│       ├── components/    # React components
│       │   ├── Header/    # Header with auth, profile, favourites
│       │   ├── Hero/      # Landing hero section
│       │   ├── SearchBar/ # Search with filters
│       │   ├── MapSection/# Google Maps integration
│       │   ├── ListingsGrid/  # Property cards grid
│       │   ├── BookingModal/   # Booking form & validation
│       │   ├── PropertyDetail/ # Property details modal
│       │   ├── AboutModal/     # About Us page
│       │   └── Footer/   # Site footer
│       ├── hooks/         # Global custom hooks
│       ├── utils/         # Constants and utilities
│       └── services/      # API service
├── CONTRIBUTING.md        # Contribution guide
├── CODE_OF_CONDUCT.md     # Community guidelines
└── LICENSE                # MIT License
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api` | Health check |
| `GET` | `/api/properties/search?query=Tokyo` | Search hotels |
| `GET` | `/api/properties/nearby?lat=35.67&lng=139.65` | Nearby search |
| `GET` | `/api/properties/:id` | Property details |
| `POST` | `/api/bookings` | Create booking |
| `GET` | `/api/bookings/:id` | Get booking |
| `POST` | `/api/users/register` | Register user |
| `POST` | `/api/users/login` | Login user |

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Quick start:
1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ for travelers worldwide**

⭐ Star this repo if you found it helpful!

</div>