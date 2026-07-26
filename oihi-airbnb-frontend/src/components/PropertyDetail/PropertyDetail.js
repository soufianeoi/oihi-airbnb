/**
 * @file PropertyDetail.js
 * @description Property detail modal component that displays comprehensive
 *              information about a selected property. Shows the property image,
 *              title, location, description, rating, price, amenities, opening
 *              hours, contact info, and action buttons for booking and mapping.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import { PRICE_LABELS } from '../../utils/constants';
import { handleImageError } from '../ListingCard/utils';

/**
 * PropertyDetail - Renders the full property detail modal overlay.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.property - The property data object with all detail fields.
 * @param {function} props.onClose - Callback to close the detail modal.
 * @param {function} props.onOpenBooking - Callback to open the booking modal for this property.
 * @param {function} props.onToggleFavourite - Callback to toggle favourite status.
 * @param {boolean} props.isFavourite - Whether this property is in the user's favourites.
 * @returns {JSX.Element} The property detail modal markup.
 */
function PropertyDetail({ property, onClose, onOpenBooking, onToggleFavourite, isFavourite }) {
  return (
    <div className="modal-overlay active">
      <div className="modal" style={{ maxWidth: '700px' }}>
        <div className="modal-header">
          <h2>{property.title}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <img
            src={property.image}
            className="property-detail-image"
            alt={property.title}
            onError={handleImageError}
          />

          <div className="property-detail-content">
            {/* Title with price level badge */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px',
              }}
            >
              <h2 style={{ margin: 0 }}>{property.title}</h2>
              {property.priceLevel > 0 && (
                <span
                  style={{
                    background: '#f0f0f0',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#484848',
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                >
                  {PRICE_LABELS[property.priceLevel]}
                </span>
              )}
            </div>

            <p className="host">{property.location}</p>
            <p className="description">{property.description}</p>

            {/* Rating, price, and type metadata */}
            <div className="property-detail-meta">
              <div className="meta-item">
                <div className="meta-value">★ {property.rating || 'N/A'}</div>
                <div className="meta-label">{property.reviews} reviews</div>
              </div>
              <div className="meta-item">
                <div className="meta-value">~${property.price}</div>
                <div className="meta-label">Est. per night</div>
              </div>
              <div className="meta-item">
                <div className="meta-value">{property.type}</div>
                <div className="meta-label">{property.guests} guests</div>
              </div>
            </div>

            {/* Amenities section */}
            {property.amenities && property.amenities.length > 0 && (
              <>
                <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Amenities</h3>
                <div className="amenities-grid">
                  {property.amenities.map((a) => (
                    <span className="amenity-tag" key={a}>
                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}

            {/* Opening hours section */}
            {property.openingHours && (
              <div
                style={{
                  background: '#f7f7f7',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <h4 style={{ fontSize: '14px', marginBottom: '8px', color: '#222' }}>
                  Opening Hours
                </h4>
                {property.openingHours.weekday_text ? (
                  property.openingHours.weekday_text.map((day, i) => (
                    <div key={i} style={{ fontSize: '13px', color: '#5e5e5e', padding: '2px 0' }}>
                      {day}
                    </div>
                  ))
                ) : (
                  <span
                    style={{
                      fontSize: '13px',
                      color: property.openingHours.open_now ? '#0a8a0a' : '#d32f2f',
                      fontWeight: '600',
                    }}
                  >
                    {property.openingHours.open_now ? 'Open now' : 'Currently closed'}
                  </span>
                )}
              </div>
            )}

            {/* Phone contact */}
            {property.phone && (
              <p style={{ fontSize: '14px', color: '#484848', marginBottom: '8px' }}>
                📞 {property.phone}
              </p>
            )}

            {/* Website link */}
            {property.website && (
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                <a
                  href={property.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ff5a5f', fontWeight: '600' }}
                >
                  🌐 Visit Website
                </a>
              </p>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => onOpenBooking(property)}
              >
                Reserve Now
              </button>
              {property.googleMapsUrl && (
                <a
                  href={property.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none', flex: 1 }}
                >
                  📍 View on Google Maps
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
