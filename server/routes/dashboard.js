const express = require('express');
const router = express.Router();
const { restrict } = require('../middleware/auth');

// Dashboard route
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    res.render('dashboard', { user: req.session.user });
  }
});

module.exports = router;
