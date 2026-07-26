const express = require('express');
const router = express.Router();

const users = [];

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, error: 'Email already registered' });
  }

  const user = {
    id: users.length + 1,
    name,
    email,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  res.status(201).json({ success: true, data: user });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' });
  }

  res.json({ success: true, data: { id: user.id, name: user.name, email: user.email } });
});

router.get('/', (req, res) => {
  res.json({ success: true, count: users.length, data: users.map(u => ({ id: u.id, name: u.name, email: u.email })) });
});

module.exports = router;