const express = require('express');
const router = express.Router();
const { restrict } = require('../middleware/auth');
const Property = require('../models/Property');
const Agent = require('../models/Agent');

// Dashboard route
router.get('/dashboard', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    try {
      // Fetch recent properties (limit to 6 for dashboard display)
      const properties = await Property.find()
        .sort({ createdAt: -1 })
        .limit(6);

      // Get statistics
      const totalProperties = await Property.countDocuments();
      const propertiesForSale = await Property.countDocuments({ status: 'For Sale' });
      const propertiesForRent = await Property.countDocuments({ status: 'For Rent' });
      const soldProperties = await Property.countDocuments({ status: 'Sold' });
      const totalAgents = await Agent.countDocuments();
      
      // Calculate average property price
      const avgPriceResult = await Property.aggregate([
        { $group: { _id: null, avgPrice: { $avg: '$price' } } }
      ]);
      const avgPrice = avgPriceResult.length > 0 ? avgPriceResult[0].avgPrice : 0;

      // Generate monthly revenue data for charts
      const currentMonth = new Date().getMonth();
      const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
        const baseRevenue = 50000 + Math.random() * 100000;
        return Math.floor(baseRevenue * (i === currentMonth ? 1.2 : 1));
      });
      
      // Calculate revenue growth
      const lastMonthRevenue = monthlyRevenue[currentMonth - 1] || monthlyRevenue[11];
      const currentMonthRevenue = monthlyRevenue[currentMonth];
      const revenueGrowth = ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);

      const stats = {
        propertiesForSale,
        propertiesForRent,
        totalCustomers: Math.floor(totalAgents * 12.5), // Simulated customer count
        totalProperties,
        soldProperties,
        avgPrice: Math.round(avgPrice),
        monthlyRevenue,
        revenueGrowth,
        totalAgents
      };
      
      res.render('dashboard', { 
        user: req.session.user,
        properties: properties,
        stats: stats
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.render('dashboard', { 
        user: req.session.user,
        properties: [],
        stats: {
          propertiesForSale: 0,
          propertiesForRent: 0,
          totalCustomers: 0,
          totalProperties: 0,
          soldProperties: 0,
          avgPrice: 0,
          monthlyRevenue: Array(12).fill(50000),
          revenueGrowth: 0,
          totalAgents: 0
        }
      });
    }
  }
});

module.exports = router;
