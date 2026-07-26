/**
 * @fileoverview Application-wide constants for the Oihi AirBNB backend.
 * Contains static values such as image URLs, property types, amenity lists,
 * and other configuration that does not change at runtime.
 *
 * @module utils/constants
 * @version 1.0.0
 */

/**
 * Curated list of high-quality hotel/property images from Unsplash.
 * Used as fallback images when Google Places photos are unavailable.
 * @type {string[]}
 */
const HOTEL_IMAGES = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
  'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
  'https://images.unsplash.com/photo-1596422846543-7fc62f073959?w=800&q=80',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
  'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=800&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  'https://images.unsplash.com/photo-1495365200479-c7ed3c3f1d5c?w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
  'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80',
  'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
  'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=800&q=80',
];

/**
 * Mapping of Google Places types to user-friendly property type labels.
 * @type {Object<string, string>}
 */
const PROPERTY_TYPE_MAP = {
  hotel: 'Hotel',
  hostel: 'Hostel',
  motel: 'Motel',
  apartment: 'Apartment',
  guest_house: 'Guest House',
  campground: 'Cabin',
};

/**
 * Keywords used to detect lodging-related queries for search enhancement.
 * @type {string[]}
 */
const LODGING_KEYWORDS = [
  'hotel', 'hostel', 'lodging', 'accommodation', 'stay', 'rental',
  'apartment', 'guesthouse', 'inn', 'resort', 'villa', 'motel',
  'ryokan', 'bnb',
];

/**
 * Property type strings that are accepted as valid lodging results.
 * @type {string[]}
 */
const VALID_LODGING_TYPES = [
  'hotel', 'lodging', 'hostel', 'motel', 'apartment',
  'guest', 'cabin', 'rv',
];

/**
 * Price tiers for estimating nightly rates based on star rating.
 * Each entry: [minRating, basePrice]
 * @type {Array<[number, number]>}
 */
const PRICE_TIERS = [
  [4.7, 200],
  [4.5, 150],
  [4.3, 120],
  [4.0, 90],
  [3.5, 70],
  [0.1, 55],
];

/**
 * Minimum and maximum allowed nightly prices.
 * @type {Object}
 */
const PRICE_BOUNDS = {
  min: 40,
  max: 500,
};

/**
 * Amenity tiers based on price thresholds.
 * @type {Array<{threshold: number, amenities: string[]}>}
 */
const AMENITY_TIERS = [
  { threshold: 90, amenities: ['Air conditioning'] },
  { threshold: 120, amenities: ['Kitchen'] },
  { threshold: 150, amenities: ['Pool', 'Gym'] },
  { threshold: 200, amenities: ['Parking', 'Spa'] },
];

/**
 * Default amenities included for all properties regardless of price.
 * @type {string[]}
 */
const BASE_AMENITIES = ['WiFi', 'TV'];

/**
 * Google Places API field masks for different request types.
 * @type {Object}
 */
const PLACES_FIELD_MASKS = {
  /** Fields for text/nearby search results */
  search: 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.types,places.location,places.googleMapsUri,places.websiteUri,places.nationalPhoneNumber,places.businessStatus,places.currentOpeningHours',
  /** Fields for single place detail requests */
  detail: 'id,displayName,formattedAddress,rating,userRatingCount,types,location,googleMapsUri,websiteUri,nationalPhoneNumber,businessStatus,currentOpeningHours,regularOpeningHours',
};

module.exports = {
  HOTEL_IMAGES,
  PROPERTY_TYPE_MAP,
  LODGING_KEYWORDS,
  VALID_LODGING_TYPES,
  PRICE_TIERS,
  PRICE_BOUNDS,
  AMENITY_TIERS,
  BASE_AMENITIES,
  PLACES_FIELD_MASKS,
};
