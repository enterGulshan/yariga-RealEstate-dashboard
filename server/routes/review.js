const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Review list page
router.get('/review', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Get filter parameters
    const { status } = req.query;
    let filter = {};

    if (status && status !== 'All Reviews') {
      filter.status = status;
    }

    const reviews = await Review.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments(filter);
    const totalPages = Math.ceil(totalReviews / limit);

    res.render('review', {
      user: req.session.user,
      reviews,
      currentPage: page,
      totalPages,
      totalReviews,
      selectedStatus: status || 'All Reviews'
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Server Error');
  }
});

// Update review status (approve/reject)
router.post('/review/:id/approve', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    await Review.findByIdAndUpdate(req.params.id, {
      'actions.approve': true,
      'actions.reject': false,
      status: 'Published'
    });

    req.session.success = 'Review approved successfully!';
    res.redirect('/review');
  } catch (error) {
    console.error('Error approving review:', error);
    req.session.error = 'Error approving review. Please try again.';
    res.redirect('/review');
  }
});

router.post('/review/:id/reject', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    await Review.findByIdAndUpdate(req.params.id, {
      'actions.approve': false,
      'actions.reject': true,
      status: 'Deleted'
    });

    req.session.success = 'Review rejected successfully!';
    res.redirect('/review');
  } catch (error) {
    console.error('Error rejecting review:', error);
    req.session.error = 'Error rejecting review. Please try again.';
    res.redirect('/review');
  }
});

module.exports = router;
