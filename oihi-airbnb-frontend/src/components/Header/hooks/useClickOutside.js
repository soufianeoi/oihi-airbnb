/**
 * @file useClickOutside.js
 * @description Custom hook that detects clicks outside a referenced DOM element
 *              and invokes a callback when that occurs. Used by the Header
 *              component to close the profile dropdown when the user clicks
 *              anywhere else on the page.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import { useEffect } from 'react';

/**
 * useClickOutside - Attaches a mousedown listener to the document that
 * fires the provided callback when a click occurs outside the given ref.
 *
 * @param {React.RefObject} ref - The React ref attached to the container element.
 * @param {function} callback - Function to call when a click outside is detected.
 */
function useClickOutside(ref, callback) {
  useEffect(() => {
    /**
     * Handles the mousedown event on the document. If the click target
     * is outside the referenced element, the callback is invoked.
     *
     * @param {MouseEvent} event - The native mouse event.
     */
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
