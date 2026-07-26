/**
 * @file constants.js
 * @description App-wide constants for the Oihi AirBNB frontend application.
 *              Contains URL definitions, labels, configuration values, and
 *              other static data used across multiple components.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

/**
 * Application name displayed in headers, footers, and metadata.
 * @type {string}
 */
export const APP_NAME = 'Oihi AirBNB';

/**
 * API base URL, read from environment variables with a localhost fallback.
 * @type {string}
 */
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Google Maps API key from environment variables.
 * @type {string}
 */
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

/**
 * Price level labels mapped by index. Index 0 is unused (placeholder).
 * Used in ListingCard and PropertyDetail to display price tier indicators.
 * @type {string[]}
 */
export const PRICE_LABELS = ['', '$', '$$', '$$$', '$$$$'];

/**
 * Default map center coordinates (Tokyo, Japan).
 * Used when no properties are available to center the map.
 * @type {{ lat: number, lng: number }}
 */
export const DEFAULT_MAP_CENTER = { lat: 35.6762, lng: 139.6503 };

/**
 * Fallback image URL used when a property image fails to load.
 * @type {string}
 */
export const FALLBACK_IMAGE_URL = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80';

/**
 * localStorage keys used by the application.
 * @type {string}
 */
export const STORAGE_KEYS = {
  FAVOURITES: 'oihi_favourites',
  USER: 'oihi_user',
  TOKEN: 'oihi_token',
};

/**
 * Cleaning fee multiplier applied to the nightly price.
 * @type {number}
 */
export const CLEANING_FEE_MULTIPLIER = 0.3;

/**
 * Service fee percentage applied to the nightly price.
 * @type {number}
 */
export const SERVICE_FEE_RATE = 0.14;

/**
 * Navigation anchor links used in Header and Footer.
 * @type {{ label: string, href: string }[]}
 */
export const NAV_LINKS = [
  { label: 'Stays', href: '#listings' },
  { label: 'Map', href: '#map' },
];

/**
 * Footer column data for rendering footer link sections.
 * @type {{ title: string, links: { label: string, href: string }[] }[]}
 */
export const FOOTER_COLUMNS = [
  {
    title: 'Oihi AirBNB',
    links: [
      { label: 'About us', href: '#about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Safety', href: '#' },
      { label: 'Cancellation', href: '#' },
      { label: 'Disability Support', href: '#' },
    ],
  },
  {
    title: 'Hosting',
    links: [
      { label: 'Start hosting', href: '#' },
      { label: 'Hospitality', href: '#' },
      { label: 'Community Hub', href: '#' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Trust & Safety', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  },
];
