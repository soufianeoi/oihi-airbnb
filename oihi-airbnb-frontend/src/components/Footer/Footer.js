/**
 * @file Footer.js
 * @description Application footer component. Renders four columns of navigation
 *              links (About, Support, Hosting, Trust) and a bottom bar with
 *              copyright and tagline. Uses FOOTER_COLUMNS from constants for data.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React from 'react';
import { FOOTER_COLUMNS } from '../../utils/constants';

/**
 * Footer - Renders the site footer with navigation links and copyright.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onShowAbout - Callback to open the About modal.
 * @returns {JSX.Element} The footer markup.
 */
function Footer({ onShowAbout }) {
  return (
    <footer id="about">
      <div className="container">
        <div className="footer-grid">
          {FOOTER_COLUMNS.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.label === 'About us' && onShowAbout) {
                      e.preventDefault();
                      onShowAbout();
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Oihi AirBNB. All rights reserved.</span>
          <span>Built with ❤️ for travelers worldwide</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
