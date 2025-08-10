const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const User = require('../models/User');

// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup
router.post('/signup', async (req, res) => {
  try {
    const { username, name, password, confirmPassword } = req.body;

    // Validate password match
    if (password !== confirmPassword) {
      req.session.error = 'Passwords do not match.';
      return res.redirect('/signup');
    }

    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.session.error = 'Username already exists.';
      return res.redirect('/signup');
    }

    // Create new user
    const user = await User.create({
      username,
      name,
      password,
      email: req.body.email,
      lastLogin: new Date()
    });

    // Log user in automatically
    req.session.regenerate((err) => {
      if (err) throw err;
      
      req.session.user = {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role
      };
      req.session.success = 'Welcome to YARIGA, ' + user.name + '!';
      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Signup error:', error);
    req.session.error = 'Error creating account. Please try again.';
    res.redirect('/signup');
  }
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
