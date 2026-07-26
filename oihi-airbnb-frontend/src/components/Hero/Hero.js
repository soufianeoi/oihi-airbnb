/**
 * @file Hero.js
 * @description Hero section component displayed at the top of the page.
 *              Renders the main headline and subtitle introducing the
 *              Oihi AirBNB platform to visitors.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';

/**
 * Hero - Renders the hero banner section with the main headline
 * and subtitle. Pure presentational component with no state.
 *
 * @returns {JSX.Element} The hero section markup.
 */
function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        Find a place to <span>stay</span>
      </h1>
      <p className="hero-subtitle">
        Discover unique properties in top destinations around the world
      </p>
    </section>
  );
}

export default Hero;
