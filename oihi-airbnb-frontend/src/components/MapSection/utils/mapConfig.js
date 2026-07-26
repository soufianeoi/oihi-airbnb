/**
 * @file mapConfig.js
 * @description Google Maps configuration constants used by the MapSection component.
 *              Contains marker icon definition, map container styles, and the
 *              default center coordinates when no properties are loaded.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { DEFAULT_MAP_CENTER } from '../../../utils/constants';

/**
 * Custom marker icon configuration for property pins on the map.
 * Defines the SVG path, fill color, stroke, and scale of the marker.
 * @type {Object}
 */
export const markerIcon = {
  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  fillColor: '#ff5a5f',
  fillOpacity: 1,
  strokeColor: '#fff',
  strokeWeight: 2,
  scale: 2,
};

/**
 * CSS style object applied to the GoogleMap container element.
 * Sets the height, width, border radius, border, and shadow.
 * @type {Object}
 */
export const mapContainerStyle = {
  height: '450px',
  width: '100%',
  borderRadius: '16px',
  border: '1px solid #e0e0e0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
};

/**
 * Default center coordinates for the map when no properties are available.
 * Points to Tokyo, Japan.
 * @type {{ lat: number, lng: number }}
 */
export const defaultCenter = DEFAULT_MAP_CENTER;

/**
 * Google Maps options to disable default controls that are not needed
 * in this application (map type, street view, fullscreen).
 * @type {Object}
 */
export const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};
