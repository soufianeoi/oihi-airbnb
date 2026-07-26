/**
 * @file MapSection.js
 * @description Map section component that renders an interactive Google Map with
 *              property markers and info windows. Uses the useGoogleMap hook for
 *              API loading and map bounds logic, and mapConfig utils for styling.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useGoogleMap } from './hooks';
import { markerIcon, mapContainerStyle, mapOptions } from './utils';

/**
 * MapSection - Renders an interactive Google Map displaying property markers.
 * Shows loading and error states while the Maps API initializes.
 *
 * @param {Object} props - Component props.
 * @param {Object[]} props.properties - Array of property objects with lat/lng/image/title/price.
 * @param {Object|null} props.selectedProperty - The property whose info window is open, or null.
 * @param {function} props.onMarkerClick - Callback when a marker is clicked.
 * @param {function} props.onCloseInfoWindow - Callback to close the info window.
 * @param {function} props.onOpenBooking - Callback to open the booking modal for a property.
 * @returns {JSX.Element} The map section markup.
 */
function MapSection({ properties, selectedProperty, onMarkerClick, onCloseInfoWindow, onOpenBooking }) {
  const { isLoaded, loadError, mapCenter, onMapLoad } = useGoogleMap(properties);

  // Error state: API key issue or network failure
  if (loadError) {
    return (
      <section className="map-section" id="map">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore on the Map</h2>
          </div>
          <div
            className="map-container"
            style={{
              ...mapContainerStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f7f7f7',
            }}
          >
            <div style={{ textAlign: 'center', color: '#717171' }}>
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>Map could not load</p>
              <p style={{ fontSize: '13px' }}>Check your Google Maps API key in the .env file</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Loading state: API is still being fetched
  if (!isLoaded) {
    return (
      <section className="map-section" id="map">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore on the Map</h2>
          </div>
          <div
            className="map-container"
            style={{
              ...mapContainerStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f7f7f7',
            }}
          >
            <div className="loading">
              <div className="spinner" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="map-section" id="map">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Explore on the Map</h2>
        </div>
        <div className="map-container">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={11}
            onLoad={onMapLoad}
            options={mapOptions}
          >
            {/* Property markers */}
            {properties.map((prop) => (
              <Marker
                key={prop.id}
                position={{ lat: prop.lat, lng: prop.lng }}
                onClick={() => onMarkerClick(prop)}
                icon={markerIcon}
              />
            ))}

            {/* Info window for the selected property */}
            {selectedProperty && (
              <InfoWindow
                position={{ lat: selectedProperty.lat, lng: selectedProperty.lng }}
                onCloseClick={onCloseInfoWindow}
              >
                <div style={{ fontFamily: 'sans-serif', minWidth: '220px', padding: '4px 0' }}>
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '8px',
                    }}
                  />
                  <h4 style={{ margin: '0 0 4px', fontSize: '14px' }}>{selectedProperty.title}</h4>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#717171' }}>
                    {selectedProperty.location}
                  </p>
                  <p style={{ margin: '0 0 8px', fontSize: '14px', fontWeight: '700' }}>
                    ${selectedProperty.price}/night
                  </p>
                  <button
                    onClick={() => onOpenBooking(selectedProperty)}
                    style={{
                      padding: '8px 16px',
                      background: '#ff5a5f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      width: '100%',
                    }}
                  >
                    Reserve Now
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
