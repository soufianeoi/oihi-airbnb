const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

const hotelImages = [
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
  'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=800&q=80'
];

function getImageForPlace(placeId, index) {
  const hash = crypto.createHash('md5').update(String(placeId || index)).digest('hex');
  const idx = parseInt(hash.substring(0, 8), 16) % hotelImages.length;
  return hotelImages[idx];
}

function buildPropertyFromPlace(place, index) {
  const placeId = place.id || place.place_id || 'unknown_' + index;
  const name = place.displayName?.text || place.name || 'Unknown Place';
  const photoUrl = getImageForPlace(placeId, index);

  const types = place.types || [];
  let propertyType = 'Lodging';
  if (types.includes('hotel')) propertyType = 'Hotel';
  if (types.includes('hostel')) propertyType = 'Hostel';
  if (types.includes('motel')) propertyType = 'Motel';
  if (types.includes('apartment')) propertyType = 'Apartment';
  if (types.includes('guest_house')) propertyType = 'Guest House';
  if (types.includes('campground')) propertyType = 'Cabin';

  const rating = place.rating || 0;
  let estimatedPrice = 80;
  if (rating >= 4.7) estimatedPrice = 200;
  else if (rating >= 4.5) estimatedPrice = 150;
  else if (rating >= 4.3) estimatedPrice = 120;
  else if (rating >= 4.0) estimatedPrice = 90;
  else if (rating >= 3.5) estimatedPrice = 70;
  else if (rating > 0) estimatedPrice = 55;
  const jitter = ((parseInt(placeId.charCodeAt(0).toString(), 16) % 30) - 15);
  estimatedPrice = Math.max(40, estimatedPrice + jitter);

  const lat = place.location?.latitude || 0;
  const lng = place.location?.longitude || 0;

  return {
    id: index + 1,
    placeId,
    title: name,
    host: 'Google Maps Verified',
    hostAvatar: 'https://i.pravatar.cc/150?img=0',
    price: estimatedPrice,
    rating,
    reviews: place.userRatingCount || 0,
    location: place.formattedAddress || 'Unknown location',
    lat, lng,
    type: propertyType,
    guests: Math.max(1, Math.floor(estimatedPrice / 40)),
    bedrooms: Math.max(1, Math.floor(estimatedPrice / 80)),
    bathrooms: 1,
    amenities: getAmenities(estimatedPrice),
    image: photoUrl,
    description: name + ' is located at ' + (place.formattedAddress || 'this location') + '. Rating: ' + (rating || 'N/A') + '/5 based on ' + (place.userRatingCount || 0) + ' reviews.',
    openingHours: place.currentOpeningHours || place.regularOpeningHours || null,
    googleMapsUrl: place.googleMapsUri || ('https://maps.google.com/?q=' + lat + ',' + lng),
    website: place.websiteUri || null,
    phone: place.nationalPhoneNumber || null,
    businessStatus: place.businessStatus || null
  };
}

function getAmenities(price) {
  const base = ['WiFi', 'TV'];
  if (price >= 90) base.push('Air conditioning');
  if (price >= 120) base.push('Kitchen');
  if (price >= 150) base.push('Pool', 'Gym');
  if (price >= 200) base.push('Parking', 'Spa');
  return base;
}

router.get('/search', async (req, res) => {
  const { query, type, minPrice, maxPrice, guests } = req.query;

  try {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.includes('PASTE')) {
      return res.status(500).json({ success: false, error: 'API key not configured' });
    }

    const rawQuery = (query || 'hotels in Tokyo').trim();
    const lodgingKeywords = ['hotel', 'hostel', 'lodging', 'accommodation', 'stay', 'rental', 'apartment', 'guesthouse', 'inn', 'resort', 'villa', 'motel', 'ryokan', 'bnb'];
    const hasLodgingKeyword = lodgingKeywords.some(kw => rawQuery.toLowerCase().includes(kw));
    const searchQuery = hasLodgingKeyword ? rawQuery : 'hotels and places to stay in ' + rawQuery;

    console.log('[Places] Searching: ' + searchQuery);

    const placesRes = await axios.post(
      'https://places.googleapis.com/v1/places:searchText',
      { textQuery: searchQuery, maxResultCount: 20, languageCode: 'en' },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.types,places.location,places.googleMapsUri,places.websiteUri,places.nationalPhoneNumber,places.businessStatus,places.currentOpeningHours'
        }
      }
    );

    const places = placesRes.data.places || [];
    console.log('[Places] Found ' + places.length);

    let results = places
      .map((place, i) => buildPropertyFromPlace(place, i))
      .filter(p => {
        const t = p.type.toLowerCase();
        return t.includes('hotel') || t.includes('lodging') || t.includes('hostel') || t.includes('motel') || t.includes('apartment') || t.includes('guest') || t.includes('cabin') || t.includes('rv');
      });

    if (type && type !== 'all') {
      results = results.filter(p => p.type.toLowerCase().includes(type.toLowerCase()));
    }
    if (minPrice) results = results.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) results = results.filter(p => p.price <= parseFloat(maxPrice));
    if (guests) results = results.filter(p => p.guests >= parseInt(guests));

    results.forEach((p, i) => p.id = i + 1);

    res.json({ success: true, count: results.length, data: results, source: 'Google Maps' });
  } catch (error) {
    console.error('[Places] Error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch places', details: error.response?.data?.error?.message || error.message });
  }
});

router.get('/nearby', async (req, res) => {
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) return res.status(400).json({ success: false, error: 'lat and lng required' });

  try {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.includes('PASTE')) {
      return res.status(500).json({ success: false, error: 'API key not configured' });
    }

    const placesRes = await axios.post(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        maxResultCount: 20,
        locationRestriction: {
          circle: { center: { latitude: parseFloat(lat), longitude: parseFloat(lng) }, radius: parseInt(radius) || 10000 }
        },
        languageCode: 'en'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.types,places.location,places.googleMapsUri,places.websiteUri,places.nationalPhoneNumber,places.businessStatus'
        }
      }
    );

    const places = placesRes.data.places || [];
    console.log('[Places] Nearby: ' + places.length);
    const results = places.map((place, i) => buildPropertyFromPlace(place, i));
    res.json({ success: true, count: results.length, data: results, source: 'Google Maps' });
  } catch (error) {
    console.error('[Places] Nearby error:', error.response?.data || error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch nearby' });
  }
});

router.get('/:id', async (req, res) => {
  const placeId = req.params.id;
  try {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY.includes('PASTE')) {
      return res.status(500).json({ success: false, error: 'API key not configured' });
    }
    const placesRes = await axios.get('https://places.googleapis.com/v1/places/' + placeId, {
      headers: { 'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY, 'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,types,location,googleMapsUri,websiteUri,nationalPhoneNumber,businessStatus,currentOpeningHours,regularOpeningHours' }
    });
    const place = placesRes.data;
    if (!place || !place.id) return res.status(404).json({ success: false, error: 'Not found' });
    const result = buildPropertyFromPlace(place, 0);
    result.id = 0;
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed' });
  }
});

module.exports = router;