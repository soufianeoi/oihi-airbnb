/**
 * @file useGoogleMap.js
 * @description Custom hook that manages Google Maps API loading and map interaction
 *              logic. Handles the asynchronous loading of the Maps JS API via
 *              @react-google-maps/api, provides a callback to fit map bounds to
 *              the loaded properties, and exposes loading/error states.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { useState, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../../utils/constants';

/**
 * useGoogleMap - Loads the Google Maps JS API and provides map interaction helpers.
 *
 * @param {Object[]} properties - Array of property objects with lat/lng fields.
 * @returns {Object} An object containing map state and handlers.
 * @returns {boolean} return.isLoaded - Whether the Maps API has finished loading.
 * @returns {Error|null} return.loadError - Error object if the API failed to load.
 * @returns {function} return.onMapLoad - Callback to pass to GoogleMap's onLoad prop.
 *                                        Fits the map bounds to all properties.
 */
function useGoogleMap(properties) {
  /** Center coordinates of the map */
  const [mapCenter, setMapCenter] = useState({ lat: 35.6762, lng: 139.6503 });

  /**
   * Loads the Google Maps JavaScript API with the Places library.
   * isLoaded becomes true once loading completes; loadError is set on failure.
   */
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  /**
   * Callback fired when the GoogleMap component finishes loading.
   * Computes bounding box from all property coordinates and fits the map
   * to display all markers with padding.
   *
   * @param {google.maps.Map} map - The Google Maps instance.
   */
  const onMapLoad = useCallback(
    (map) => {
      if (properties.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        properties.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
        map.fitBounds(bounds, 50);
      }
    },
    [properties]
  );

  return {
    isLoaded,
    loadError,
    mapCenter,
    setMapCenter,
    onMapLoad,
  };
}

export default useGoogleMap;
