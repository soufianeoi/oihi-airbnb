/**
 * @file ListingsGrid.js
 * @description Grid layout component that renders a collection of ListingCard items
 *              for each property. Displays an empty state with a clear-filters
 *              button when no properties match the current search criteria.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import ListingCard from '../ListingCard';

/**
 * ListingsGrid - Renders a responsive grid of property listing cards.
 *
 * @param {Object} props - Component props.
 * @param {Object[]} props.properties - Array of property objects to display.
 * @param {Set} props.favourites - Set of favourited property IDs.
 * @param {function} props.onToggleFavourite - Callback to add/remove a favourite.
 * @param {function} props.onOpenDetail - Callback to open the property detail modal.
 * @param {function} props.onOpenBooking - Callback to open the booking modal.
 * @returns {JSX.Element} The listings grid or an empty-state message.
 */
function ListingsGrid({ properties, favourites, onToggleFavourite, onOpenDetail, onOpenBooking }) {
  // Empty state when no properties match
  if (properties.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</p>
        <p style={{ fontSize: '18px', color: '#717171', marginBottom: '12px' }}>No properties found</p>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="listings-grid">
      {properties.map((prop) => (
        <ListingCard
          key={prop.id}
          property={prop}
          isFavourite={favourites.has(prop.id)}
          onToggleFavourite={onToggleFavourite}
          onOpenDetail={onOpenDetail}
          onOpenBooking={onOpenBooking}
        />
      ))}
    </div>
  );
}

export default ListingsGrid;
