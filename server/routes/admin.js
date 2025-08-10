const express = require('express');
const router = express.Router();
const { restrictToAdmin } = require('../middleware/auth');
const User = require('../models/User');

// Admin dashboard
router.get('/admin', restrictToAdmin, async (req, res) => {
  try {
    // Get all users except the current admin
    const users = await User.find({ _id: { $ne: req.session.user.id } })
      .select('-password') // Exclude password field
      .sort({ createdAt: -1 });

    res.render('admin/dashboard', { 
      user: req.session.user,
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    req.session.error = 'Error loading admin dashboard';
    res.redirect('/dashboard');
  }
});

// View user details
router.get('/admin/users/:id', restrictToAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      req.session.error = 'User not found';
      return res.redirect('/admin');
    }
    res.render('admin/user-details', { 
      user: req.session.user,
      targetUser: user
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    req.session.error = 'Error loading user details';
    res.redirect('/admin');
  }
});

// Update user status
router.post('/admin/users/:id/toggle-status', restrictToAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      req.session.error = 'User not found';
      return res.redirect('/admin');
    }

    user.isActive = !user.isActive;
    await user.save();

    req.session.success = `User ${user.isActive ? 'activated' : 'deactivated'} successfully`;
    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating user status:', error);
    req.session.error = 'Error updating user status';
    res.redirect('/admin');
  }
});

// Update user role
router.post('/admin/users/:id/update-role', restrictToAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) {
      req.session.error = 'User not found';
      return res.redirect('/admin');
    }

    if (!['user', 'admin', 'agent'].includes(role)) {
      req.session.error = 'Invalid role';
      return res.redirect('/admin');
    }

    user.role = role;
    await user.save();

    req.session.success = 'User role updated successfully';
    res.redirect('/admin');
  } catch (error) {
    console.error('Error updating user role:', error);
    req.session.error = 'Error updating user role';
    res.redirect('/admin');
  }
});

module.exports = router;
