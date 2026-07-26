/**
 * @file App.js
 * @description Root application component for the Oihi AirBNB frontend.
 *              Manages top-level application state including properties,
 *              user authentication, favourites, and modal visibility.
 *              Composes the full page layout from Header, Hero, SearchBar,
 *              MapSection, ListingsGrid, PropertyDetail, BookingModal,
 *              Footer, and AboutModal.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import MapSection from './components/MapSection';
import ListingsGrid from './components/ListingsGrid';
import BookingModal from './components/BookingModal';
import PropertyDetail from './components/PropertyDetail';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import api from './services/api';
import './App.css';

/**
 * App - Root component that orchestrates all application state and rendering.
 *
 * @returns {JSX.Element} The full application markup.
 */
function App() {
  /** Array of property objects fetched from the API */
  const [properties, setProperties] = useState([]);

  /** Currently selected property for the map info window, or null */
  const [selectedProperty, setSelectedProperty] = useState(null);

  /** Property being booked (opens the BookingModal), or null */
  const [bookingProperty, setBookingProperty] = useState(null);

  /** Property shown in the detail modal, or null */
  const [detailProperty, setDetailProperty] = useState(null);

  /** Set of favourited property IDs, persisted in localStorage */
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('oihi_favourites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  /** Whether properties are currently being fetched */
  const [loading, setLoading] = useState(false);

  /** Whether the Google Maps API has finished loading */
  const [mapLoaded, setMapLoaded] = useState(false);

  /** Whether the About modal is visible */
  const [showAbout, setShowAbout] = useState(false);

  /** Current user object, or null if not logged in. Persisted in localStorage. */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('oihi_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('oihi_favourites', JSON.stringify([...favourites]));
  }, [favourites]);

  /**
   * Fetches properties from the API, optionally filtered by search criteria.
   * Updates the properties state and stores the result on window.__PROPERTIES__
   * for use by the favourites modal.
   *
   * @param {Object} [filters={}] - Optional search filter criteria.
   * @param {string} [filters.query] - Text search query (location name).
   * @param {string} [filters.location] - Alias for query (used by SearchBar).
   * @param {string} [filters.type] - Property type filter.
   * @param {string} [filters.minPrice] - Minimum price filter.
   * @param {string} [filters.maxPrice] - Maximum price filter.
   * @param {string} [filters.guests] - Number of guests filter.
   */
  const fetchProperties = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.query || filters.location) params.append('query', filters.query || filters.location);
      if (filters.type && filters.type !== 'all') params.append('type', filters.type);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.guests) params.append('guests', filters.guests);

      const res = await api.get(`/properties/search?${params.toString()}`);
      if (res.data.success) {
        setProperties(res.data.data);
        // Expose properties globally for the favourites modal lookup
        window.__PROPERTIES__ = res.data.data;
      } else {
        setProperties([]);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  /**
   * Handles search form submission by re-fetching properties with filters.
   * @param {Object} filters - The search filter values from SearchBar.
   */
  const handleSearch = useCallback((filters) => {
    fetchProperties(filters);
  }, [fetchProperties]);

  /**
   * Opens the map info window for a clicked marker.
   * @param {Object} property - The property associated with the marker.
   */
  const handleMarkerClick = useCallback((property) => {
    setSelectedProperty(property);
  }, []);

  /** Closes the map info window */
  const handleCloseInfoWindow = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  /**
   * Toggles a property's favourite status. Adds it if absent, removes if present.
   * @param {number|string} id - The property ID to toggle.
   */
  const toggleFavourite = useCallback((id) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  /**
   * Opens the booking modal for a property, closing any open detail or info window.
   * @param {Object} property - The property to book.
   */
  const openBooking = useCallback((property) => {
    setBookingProperty(property);
    setDetailProperty(null);
    setSelectedProperty(null);
  }, []);

  /** Closes the booking modal */
  const closeBooking = useCallback(() => {
    setBookingProperty(null);
  }, []);

  /**
   * Opens the property detail modal.
   * @param {Object} property - The property to show details for.
   */
  const openDetail = useCallback((property) => {
    setDetailProperty(property);
  }, []);

  /** Closes the property detail modal */
  const closeDetail = useCallback(() => {
    setDetailProperty(null);
  }, []);

  /**
   * Handles successful login/registration by setting user state
   * and persisting to localStorage.
   * @param {Object} userData - The user data returned from the API.
   */
  const handleLogin = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('oihi_user', JSON.stringify(userData));
  }, []);

  /** Clears user state and removes from localStorage */
  const handleLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('oihi_user');
  }, []);

  return (
    <div className="app">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        favourites={favourites}
        onToggleFavourite={toggleFavourite}
        onShowAbout={() => setShowAbout(true)}
      />

      <Hero />

      <SearchBar onSearch={handleSearch} />

      <main>
        <MapSection
          properties={properties}
          selectedProperty={selectedProperty}
          onMarkerClick={handleMarkerClick}
          onCloseInfoWindow={handleCloseInfoWindow}
          onOpenBooking={openBooking}
          mapLoaded={mapLoaded}
          setMapLoaded={setMapLoaded}
        />

        <section className="listings-section" id="listings">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Properties</h2>
              <span className="section-link">
                {properties.length} stay{properties.length !== 1 ? 's' : ''}
              </span>
            </div>
            {loading ? (
              <div className="loading">
                <div className="spinner" />
              </div>
            ) : (
              <ListingsGrid
                properties={properties}
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
                onOpenDetail={openDetail}
                onOpenBooking={openBooking}
              />
            )}
          </div>
        </section>
      </main>

      {detailProperty && (
        <PropertyDetail
          property={detailProperty}
          onClose={closeDetail}
          onOpenBooking={openBooking}
          onToggleFavourite={toggleFavourite}
          isFavourite={favourites.has(detailProperty.id)}
        />
      )}

      {bookingProperty && (
        <BookingModal
          property={bookingProperty}
          user={user}
          onClose={closeBooking}
        />
      )}

      <Footer onShowAbout={() => setShowAbout(true)} />

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}

export default App;
