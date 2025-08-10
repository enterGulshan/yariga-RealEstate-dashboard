const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { uploadProperty, getPropertyImage } = require('../middleware/upload');

// Property list page
router.get('/property', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Get filter parameters
    const { status, type, location, search } = req.query;
    let filter = {};

    if (status && status !== 'All Status') filter.status = status;
    if (type && type !== 'Any Type') filter.type = type;
    if (location && location !== 'All Countries') filter.location = { $regex: location, $options: 'i' };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalProperties = await Property.countDocuments(filter);
    const totalPages = Math.ceil(totalProperties / limit);

    res.render('property', {
      user: req.session.user,
      properties,
      currentPage: page,
      totalPages,
      totalProperties,
      filters: { status, type, location, search }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).send('Server Error');
  }
});

// Add property page
router.get('/property/add', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('add-property', { user: req.session.user });
});

// Handle add property form submission
router.post('/property/add', uploadProperty.single('propertyImage'), async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const { title, price, location, beds, area, type, status, description, image } = req.body;

    // Handle image upload
    let imageUrl;
    if (req.file) {
      imageUrl = `/images/uploads/properties/${req.file.filename}`;
    } else if (image) {
      imageUrl = image;
    } else {
      imageUrl = getPropertyImage(null, title);
    }

    const newProperty = new Property({
      title,
      price,
      location,
      beds,
      area,
      type,
      status,
      description,
      image: imageUrl
    });

    await newProperty.save();
    req.session.success = 'Property added successfully!';
    res.redirect('/property');
  } catch (error) {
    console.error('Error adding property:', error);
    req.session.error = 'Error adding property. Please try again.';
    res.redirect('/property/add');
  }
});

// Delete property
router.post('/property/delete/:id', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    await Property.findByIdAndDelete(req.params.id);
    req.session.success = 'Property deleted successfully!';
    res.redirect('/property');
  } catch (error) {
    console.error('Error deleting property:', error);
    req.session.error = 'Error deleting property. Please try again.';
    res.redirect('/property');
  }
});

module.exports = router;
