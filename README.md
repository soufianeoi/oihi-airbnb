# Oihi AirBNB

A professional Airbnb-like accommodation platform built with React frontend and Node.js backend, integrated with Google Maps API.

## Project Structure

```
oihi-airbnb/
├── oihi-airbnb-backend/     # Node.js Express API server
│   ├── server.js            # Main server entry point
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   │   ├── properties.js    # Property search & listing API
│   │   └── bookings.js      # Booking management API
│   └── data/
│       └── properties.json  # Property data store
│
└── oihi-airbnb-frontend/    # React frontend application
    ├── package.json
    ├── public/index.html
    ├── src/
    │   ├── App.js           # Main application component
    │   ├── App.css          # Global styles
    │   ├── index.js         # React entry point
    │   ├── index.css        # Global CSS
    │   ├── services/api.js  # API client (Axios)
    │   └── components/
    │       ├── Header.js        # Navigation header
    │       ├── Hero.js          # Landing hero section
    │       ├── SearchBar.js     # Search with Google Places autocomplete
    │       ├── MapSection.js    # Google Maps with property markers
    │       ├── ListingsGrid.js  # Responsive grid of listings
    │       ├── ListingCard.js   # Individual property card
    │       ├── BookingModal.js  # Complete booking form with validation
    │       ├── PropertyDetail.js# Full property detail view
    │       └── Footer.js        # Site footer
    ├── .env.example
    └── start.bat
```

## Quick Start

### 1. Backend Setup

```powershell
cd oihi-airbnb-backend
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```powershell
cd oihi-airbnb-frontend
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

### One-click start (Windows):

Double-click `start.bat` in the `oihi-airbnb-start.bat` file in the workspace root.

## Google Maps API Setup

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable **Maps JavaScript API** and **Places API**
4. Create an API key
5. Add it to both `.env` files (`REACT_APP_GOOGLE_MAPS_API_KEY` and `GOOGLE_MAPS_API_KEY`)

## Features

- Google Maps integration with interactive property markers
- Google Places autocomplete search
- Property search & filtering (location, price range, type, guests)
- Booking system with date/email/guest validation
- Favourite/save properties
- Responsive design (mobile, tablet, desktop)
- Professional Airbnb-inspired UI with real-time price breakdown
- Toast notifications & modal dialogs