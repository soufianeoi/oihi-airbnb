/**
 * @file SearchBar.js
 * @description Search bar component that allows users to filter properties by
 *              location, check-in date, check-out date, and number of guests.
 *              Uses the useSearchForm hook for all form state management.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import { useSearchForm } from './hooks';

/**
 * SearchBar - Renders the search form with location, date, and guest inputs.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onSearch - Callback invoked with filter values on submit.
 * @returns {JSX.Element} The search bar section markup.
 */
function SearchBar({ onSearch }) {
  const {
    location,
    checkin,
    checkout,
    guests,
    handleChange,
    handleSubmit,
  } = useSearchForm(onSearch);

  return (
    <section style={{ padding: '0 0 40px' }}>
      <div className="container">
        <form className="search-bar" onSubmit={handleSubmit}>
          <div className="search-field">
            <label>Location</label>
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>Check-in</label>
            <input
              type="date"
              value={checkin}
              onChange={(e) => handleChange('checkin', e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>Check-out</label>
            <input
              type="date"
              value={checkout}
              onChange={(e) => handleChange('checkout', e.target.value)}
            />
          </div>
          <div className="search-field">
            <label>Guests</label>
            <input
              type="number"
              min="1"
              max="16"
              placeholder="1 guest"
              value={guests}
              onChange={(e) => handleChange('guests', e.target.value)}
            />
          </div>
          <button type="submit" className="search-btn" title="Search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              width="20"
              height="20"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
