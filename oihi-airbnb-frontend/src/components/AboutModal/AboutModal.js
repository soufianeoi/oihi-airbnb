/**
 * @file AboutModal.js
 * @description About modal component that displays information about the Oihi
 *              AirBNB platform. Includes the mission statement, how-it-works
 *              steps, feature highlights, and contact information. Clicking
 *              the overlay background closes the modal.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';

/**
 * AboutModal - Renders the About modal overlay with platform information.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onClose - Callback to close the About modal.
 * @returns {JSX.Element} The About modal markup.
 */
function AboutModal({ onClose }) {
  return (
    <div
      className="modal-overlay active"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal about-modal">
        <div className="modal-header">
          <h2>About Oihi AirBNB</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body about-body">
          {/* Hero section with logo */}
          <div className="about-hero">
            <div className="about-logo">
              <svg viewBox="0 0 32 32" fill="none" width="48" height="48">
                <circle cx="16" cy="16" r="15" fill="#ff5a5f" />
                <path
                  d="M16 6C10 6 6 12 6 16s4 10 10 10 10-4 10-10S22 6 16 6zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
                  fill="white"
                />
                <circle cx="16" cy="16" r="3" fill="#ff5a5f" />
              </svg>
              <h1>
                Oihi <span style={{ color: '#ff5a5f' }}>AirBNB</span>
              </h1>
            </div>
            <p className="about-tagline">Discover unique stays around the world</p>
          </div>

          {/* Mission section */}
          <div className="about-section">
            <h3>Our Mission</h3>
            <p>
              Oihi AirBNB connects travelers with extraordinary places to stay. We believe every
              journey deserves a memorable home, whether it's a boutique hotel in Marrakech, a cozy
              riad in the medina, or a luxury resort with ocean views.
            </p>
          </div>

          {/* How It Works section */}
          <div className="about-section">
            <h3>How It Works</h3>
            <div className="about-steps">
              <div className="about-step">
                <div className="about-step-number">1</div>
                <h4>Search</h4>
                <p>
                  Enter your destination and let our Google Maps integration find the best hotels and
                  stays near you.
                </p>
              </div>
              <div className="about-step">
                <div className="about-step-number">2</div>
                <h4>Explore</h4>
                <p>
                  Browse real listings with ratings, reviews, prices, and locations on an interactive
                  map.
                </p>
              </div>
              <div className="about-step">
                <div className="about-step-number">3</div>
                <h4>Book</h4>
                <p>
                  Choose your dates, review the total price, and confirm your reservation instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us section */}
          <div className="about-section">
            <h3>Why Choose Us</h3>
            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon">🌍</span>
                <div>
                  <h4>Real Listings</h4>
                  <p>All properties are sourced directly from Google Maps for accuracy and trust.</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">⭐</span>
                <div>
                  <h4>Verified Reviews</h4>
                  <p>Ratings and reviews come from real guests who have stayed at each property.</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">🔒</span>
                <div>
                  <h4>Secure Booking</h4>
                  <p>Your personal data is encrypted and your booking is confirmed instantly.</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">💰</span>
                <div>
                  <h4>Best Prices</h4>
                  <p>
                    Compare prices across properties and find the perfect stay within your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="about-section">
            <h3>Contact</h3>
            <p>Have questions or feedback? We'd love to hear from you.</p>
            <div className="about-contact">
              <a href="mailto:hello@oihi-airbnb.com" className="btn btn-primary">
                hello@oihi-airbnb.com
              </a>
            </div>
          </div>

          <div className="about-footer">
            <span>© 2026 Oihi AirBNB. Made with ❤️ for travelers worldwide.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
