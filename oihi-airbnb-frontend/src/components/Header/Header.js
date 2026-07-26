/**
 * @file Header.js
 * @description Main application header component. Renders the top navigation bar
 *              with logo, navigation links, and user actions. Manages authentication
 *              modals (login/register), profile dropdown, favourites modal, and
 *              profile editing modal. Uses the useClickOutside hook to close the
 *              profile dropdown when clicking outside.
 * @author Oihi Dev Team
 * @date 2026-07-27
 */

import React, { useState, useRef, useCallback } from 'react';
import api from '../../services/api';
import { useClickOutside } from './hooks';

/**
 * Header - Top-level navigation and authentication component.
 *
 * @param {Object} props - Component props.
 * @param {Object|null} props.user - Currently logged-in user object, or null.
 * @param {function} props.onLogin - Callback to set user data after successful auth.
 * @param {function} props.onLogout - Callback to clear user data.
 * @param {Set} props.favourites - Set of favourited property IDs.
 * @param {function} props.onToggleFavourite - Callback to add/remove a property from favourites.
 * @param {function} props.onShowAbout - Callback to open the About modal.
 * @returns {JSX.Element} The header element and associated modals.
 */
function Header({ user, onLogin, onLogout, favourites, onToggleFavourite, onShowAbout }) {
  /** Whether the auth modal (login/register) is visible */
  const [showAuthModal, setShowAuthModal] = useState(false);

  /** Current auth mode: 'login' or 'register' */
  const [authMode, setAuthMode] = useState('login');

  /** Form field values for the auth modal */
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  /** Validation / server error message for the auth modal */
  const [error, setError] = useState('');

  /** Whether an auth request is in flight */
  const [submitting, setSubmitting] = useState(false);

  /** Whether the profile dropdown is open */
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  /** Whether the favourites modal is visible */
  const [showFavouritesModal, setShowFavouritesModal] = useState(false);

  /** Whether the edit-profile modal is visible */
  const [showEditModal, setShowEditModal] = useState(false);

  /** Temp value for editing the user's display name */
  const [editName, setEditName] = useState('');

  /** Ref attached to the profile wrapper for outside-click detection */
  const profileRef = useRef(null);

  // Close the profile dropdown when clicking outside of it
  useClickOutside(profileRef, useCallback(() => setShowProfileMenu(false), []));

  /**
   * Handles input changes in the auth form, updating formData state
   * and clearing any existing error.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  /**
   * Submits the auth form to the API. Validates required fields before
   * sending, then calls onLogin with the returned user data on success.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (authMode === 'register') {
        if (!formData.name.trim()) {
          setError('Name is required');
          setSubmitting(false);
          return;
        }
        if (!formData.email.trim()) {
          setError('Email is required');
          setSubmitting(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setSubmitting(false);
          return;
        }

        const res = await api.post('/users/register', {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });

        if (res.data.success) {
          onLogin(res.data.data);
          setShowAuthModal(false);
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        if (!formData.email.trim()) {
          setError('Email is required');
          setSubmitting(false);
          return;
        }
        if (!formData.password) {
          setError('Password is required');
          setSubmitting(false);
          return;
        }

        const res = await api.post('/users/login', {
          email: formData.email.trim(),
          password: formData.password,
        });

        if (res.data.success) {
          onLogin(res.data.data);
          setShowAuthModal(false);
          setFormData({ name: '', email: '', password: '' });
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Opens the auth modal in the given mode, resetting form state.
   *
   * @param {'login'|'register'} mode - The auth mode to open.
   */
  const openAuth = (mode) => {
    setAuthMode(mode);
    setError('');
    setFormData({ name: '', email: '', password: '' });
    setShowAuthModal(true);
  };

  /**
   * Opens the edit-profile modal, pre-filling the current user name.
   */
  const handleEditProfile = () => {
    setEditName(user.name);
    setShowEditModal(true);
    setShowProfileMenu(false);
  };

  /**
   * Saves the edited profile name. Silently ignores empty names.
   */
  const saveEditProfile = () => {
    if (!editName.trim()) return;
    const updated = { ...user, name: editName.trim() };
    onLogin(updated);
    setShowEditModal(false);
  };

  /**
   * Opens a native file picker to set the user's profile photo.
   * Reads the selected file as a data URL and updates the user object.
   */
  const handleSetPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const updated = { ...user, avatar: ev.target.result };
          onLogin(updated);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
    setShowProfileMenu(false);
  };

  /** Number of favourited properties */
  const favouritesCount = favourites ? favourites.size : 0;

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <a href="/" className="header-logo">
            <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
              <circle cx="16" cy="16" r="15" fill="#ff5a5f" />
              <path
                d="M16 6C10 6 6 12 6 16s4 10 10 10 10-4 10-10S22 6 16 6zm0 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"
                fill="white"
              />
              <circle cx="16" cy="16" r="3" fill="#ff5a5f" />
            </svg>
            Oihi <strong>AirBNB</strong>
          </a>

          <nav className="header-nav">
            <a href="#listings">Stays</a>
            <a href="#map">Map</a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onShowAbout();
              }}
            >
              About
            </a>
          </nav>

          <div className="header-actions">
            {user ? (
              <>
                {/* Favourites button with badge */}
                <button
                  className="btn btn-secondary"
                  style={{ position: 'relative' }}
                  onClick={() => setShowFavouritesModal(true)}
                >
                  ♡ Favourites
                  {favouritesCount > 0 && (
                    <span className="fav-badge">{favouritesCount}</span>
                  )}
                </button>

                {/* Profile dropdown */}
                <div className="profile-wrapper" ref={profileRef}>
                  <button
                    className="profile-btn"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" className="profile-avatar" />
                    ) : (
                      <div className="profile-avatar profile-avatar-placeholder">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="profile-name">{user.name}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {showProfileMenu && (
                    <div className="profile-dropdown">
                      <div className="profile-dropdown-header">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt="Profile"
                            className="profile-dropdown-avatar"
                          />
                        ) : (
                          <div className="profile-avatar profile-dropdown-avatar-placeholder">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="profile-dropdown-name">{user.name}</div>
                          <div className="profile-dropdown-email">{user.email}</div>
                        </div>
                      </div>
                      <div className="profile-dropdown-divider" />

                      <button className="profile-dropdown-item" onClick={handleEditProfile}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Modifier Profil
                      </button>

                      <button className="profile-dropdown-item" onClick={handleSetPhoto}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Set Photo Profil
                      </button>

                      <div className="profile-dropdown-divider" />

                      <button
                        className="profile-dropdown-item profile-dropdown-logout"
                        onClick={onLogout}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={() => openAuth('login')}>
                  Log in
                </button>
                <button className="btn btn-primary" onClick={() => openAuth('register')}>
                  Sign up
                </button>
              </>
            )}

            <button className="header-menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal (Login / Register) */}
      {showAuthModal && (
        <div
          className="modal-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAuthModal(false);
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2>{authMode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
              <button className="modal-close" onClick={() => setShowAuthModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '48px' }}>{authMode === 'login' ? '👋' : '🎉'}</span>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                {authMode === 'register' && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-input"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-input"
                    name="password"
                    placeholder={authMode === 'register' ? 'At least 6 characters' : 'Enter your password'}
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ marginTop: '8px' }}
                >
                  {submitting ? 'Please wait...' : authMode === 'login' ? 'Log in' : 'Sign up'}
                </button>
              </form>

              <div
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  fontSize: '14px',
                  color: '#717171',
                }}
              >
                {authMode === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      style={{
                        color: '#ff5a5f',
                        fontWeight: '600',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                      onClick={() => {
                        setAuthMode('register');
                        setError('');
                      }}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      style={{
                        color: '#ff5a5f',
                        fontWeight: '600',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                      onClick={() => {
                        setAuthMode('login');
                        setError('');
                      }}
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favourites Modal */}
      {showFavouritesModal && (
        <div
          className="modal-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowFavouritesModal(false);
          }}
        >
          <div className="modal">
            <div className="modal-header">
              <h2>♡ My Favourites</h2>
              <button className="modal-close" onClick={() => setShowFavouritesModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {favouritesCount === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>♡</div>
                  <p style={{ color: '#717171', fontSize: '15px' }}>No favourites yet</p>
                  <p style={{ color: '#919191', fontSize: '13px' }}>
                    Click the heart on any property to save it here
                  </p>
                </div>
              ) : (
                <div className="favourites-list">
                  {[...favourites].map((id) => {
                    const prop = window.__PROPERTIES__?.find((p) => p.id === id);
                    if (!prop) return null;
                    return (
                      <div key={id} className="favourite-item">
                        <img
                          src={prop.image}
                          alt={prop.title}
                          className="favourite-item-img"
                        />
                        <div className="favourite-item-info">
                          <div className="favourite-item-title">{prop.title}</div>
                          <div className="favourite-item-location">{prop.location}</div>
                          <div className="favourite-item-price">${prop.price} / night</div>
                        </div>
                        <button
                          className="favourite-item-remove"
                          onClick={() => onToggleFavourite(id)}
                          title="Remove from favourites"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div
          className="modal-overlay active"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEditModal(false);
          }}
        >
          <div className="modal" style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2>Modifier Profil</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={user.email}
                  disabled
                  style={{ opacity: 0.6 }}
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: '8px' }}
                onClick={saveEditProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
