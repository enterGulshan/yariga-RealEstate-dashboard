const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Login POST
router.post('/login', async (req, res, next) => {
  try {
    if (!req.body) return res.sendStatus(400);
    
    const user = await authenticate(req.body.username, req.body.password);
    
    if (user) {
      // Store user in session and redirect to dashboard
      req.session.regenerate((err) => {
        if (err) return next(err);
        
        req.session.user = {
          id: user._id,
          username: user.username,
          name: user.name,
          role: user.role
        };
        req.session.success = 'Welcome back, ' + user.name + '!';
        res.redirect('/dashboard');
      });
    } else {
      req.session.error = 'Authentication failed, please check your username and password.';
      res.redirect('/login');
    }
  } catch (error) {
    next(error);
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

module.exports = router;
