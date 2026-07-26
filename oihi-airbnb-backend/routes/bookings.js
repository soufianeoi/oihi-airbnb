const express = require('express');
const router = express.Router();

const bookings = [];

router.post('/', (req, res) => {
  const { propertyId, checkin, checkout, guestName, guestEmail, guests, specialRequests, totalPrice } = req.body;

  if (!propertyId || !checkin || !checkout || !guestName || !guestEmail) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const booking = {
    id: bookings.length + 1,
    propertyId,
    checkin,
    checkout,
    guestName,
    guestEmail,
    guests: guests || 1,
    specialRequests: specialRequests || '',
    totalPrice,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.push(booking);

  console.log(`[BOOKING] New booking #${booking.id} for ${guestName} at property ${propertyId}`);
  console.log(`[BOOKING] Check-in: ${checkin}, Check-out: ${checkout}`);
  console.log(`[BOOKING] Total: $${totalPrice}`);

  res.status(201).json({
    success: true,
    message: 'Booking confirmed successfully',
    data: booking
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  res.json({ success: true, data: booking });
});

router.get('/', (req, res) => {
  res.json({ success: true, count: bookings.length, data: bookings });
});

module.exports = router;