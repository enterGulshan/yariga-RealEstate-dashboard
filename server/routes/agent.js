const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const Property = require('../models/Property');

// Agent list page
router.get('/agent', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Get search parameter
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { agency: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const agents = await Agent.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalAgents = await Agent.countDocuments(filter);
    const totalPages = Math.ceil(totalAgents / limit);

    res.render('agent', {
      user: req.session.user,
      agents,
      currentPage: page,
      totalPages,
      totalAgents,
      search: search || ''
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).send('Server Error');
  }
});

// Agent details page
router.get('/agent/:id', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      req.session.error = 'Agent not found';
      return res.redirect('/agent');
    }

    // Get agent's properties
    const properties = await Property.find({}).limit(4);

    res.render('agent-details', {
      user: req.session.user,
      agent,
      properties
    });
  } catch (error) {
    console.error('Error fetching agent details:', error);
    res.status(500).send('Server Error');
  }
});

// Add agent page
router.get('/agent/add', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('add-agent', { user: req.session.user });
});

// Handle add agent form submission
router.post('/agent/add', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      gender,
      country,
      city,
      state,
      zipCode,
      agency,
      agentLicense,
      taxNumber,
      serviceArea,
      avatar
    } = req.body;

    const newAgent = new Agent({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: dateOfBirth || undefined,
      gender,
      country,
      city,
      state,
      zipCode,
      agency,
      agentLicense,
      taxNumber,
      serviceArea,
      avatar: avatar || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
      totalListings: Math.floor(Math.random() * 50) + 10,
      propertiesSold: Math.floor(Math.random() * 30) + 5,
      propertiesRent: Math.floor(Math.random() * 20) + 3
    });

    await newAgent.save();
    req.session.success = 'Agent added successfully!';
    res.redirect('/agent');
  } catch (error) {
    console.error('Error adding agent:', error);
    if (error.code === 11000) {
      req.session.error = 'An agent with this email already exists.';
    } else {
      req.session.error = 'Error adding agent. Please try again.';
    }
    res.redirect('/agent/add');
  }
});

// Delete agent
router.post('/agent/delete/:id', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    await Agent.findByIdAndDelete(req.params.id);
    req.session.success = 'Agent deleted successfully!';
    res.redirect('/agent');
  } catch (error) {
    console.error('Error deleting agent:', error);
    req.session.error = 'Error deleting agent. Please try again.';
    res.redirect('/agent');
  }
});

module.exports = router;
