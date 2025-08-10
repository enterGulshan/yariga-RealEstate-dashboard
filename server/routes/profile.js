const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Property = require('../models/Property');

// My Profile page
router.get('/profile', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    // Get user details
    const user = await User.findById(req.session.user.id).select('-password');
    if (!user) {
      req.session.error = 'User not found';
      return res.redirect('/dashboard');
    }

    // Get user's properties (sample data for now)
    const userProperties = await Property.find().limit(3);

    res.render('profile', {
      user: req.session.user,
      profileUser: user,
      properties: userProperties
    });
  } catch (error) {
    console.error('Error loading profile:', error);
    req.session.error = 'Error loading profile';
    res.redirect('/dashboard');
  }
});

// Update profile
router.post('/profile/update', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const { name, email, phone, address } = req.body;

    await User.findByIdAndUpdate(req.session.user.id, {
      name,
      email,
      phone: phone || undefined,
      address: address || undefined
    });

    // Update session data
    req.session.user.name = name;

    req.session.success = 'Profile updated successfully!';
    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating profile:', error);
    req.session.error = 'Error updating profile. Please try again.';
    res.redirect('/profile');
  }
});

// Change profile photo
router.post('/profile/photo', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const { photoUrl } = req.body;

    await User.findByIdAndUpdate(req.session.user.id, {
      profilePicture: photoUrl || `https://ui-avatars.com/api/?name=${req.session.user.name.replace(/\s+/g, '+')}&background=random`
    });

    req.session.success = 'Profile photo updated successfully!';
    res.redirect('/profile');
  } catch (error) {
    console.error('Error updating profile photo:', error);
    req.session.error = 'Error updating profile photo. Please try again.';
    res.redirect('/profile');
  }
});

module.exports = router;
