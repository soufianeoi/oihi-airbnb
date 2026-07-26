/**
 * @file ListingCard.js
 * @description Individual property listing card component. Displays the property
 *              image, title, location, rating, price, and a favourite toggle button.
 *              Uses formatters utils for consistent price and image handling.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import { handleImageError, formatPrice, formatRating } from './utils';

/**
 * ListingCard - Renders a single property card within the listings grid.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.property - The property data object.
 * @param {boolean} props.isFavourite - Whether this property is in the user's favourites.
 * @param {function} props.onToggleFavourite - Callback to toggle favourite status.
 * @param {function} props.onOpenDetail - Callback to open the detail modal for this property.
 * @param {function} props.onOpenBooking - Callback to open the booking modal for this property.
 * @returns {JSX.Element} The listing card markup.
 */
function ListingCard({ property, isFavourite, onToggleFavourite, onOpenDetail, onOpenBooking }) {
  return (
    <div className="listing-card" onClick={() => onOpenDetail(property)}>
      <div className="listing-image">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          onError={handleImageError}
        />
        <span className="listing-badge">{property.type}</span>
        <button
          className={`listing-favorite ${isFavourite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(property.id);
          }}
          title={isFavourite ? 'Remove from favourites' : 'Save to favourites'}
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="listing-body">
        <div className="listing-location">{property.location}</div>
        <div className="listing-title">{property.title}</div>
        <div className="listing-host">📍 Google Maps Verified</div>
        <div className="listing-footer">
          <div className="listing-rating">{formatRating(property.rating, property.reviews)}</div>
          <div className="listing-price">
            {formatPrice(property.price)} <span>/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
