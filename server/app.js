'use strict'

/**
 * YARIGA - Real Estate Dashboard Backend Server
 * Module dependencies.
 */

const express = require('express');
const path = require('path');
const session = require('express-session');
const connectDB = require('./config/db');
const { createDefaultUser } = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const propertyRoutes = require('./routes/property');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/review');
const messageRoutes = require('./routes/message');
const profileRoutes = require('./routes/profile');

const app = express();

// Connect to MongoDB
connectDB();

// Create default user
createDefaultUser();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

// Static files
app.use(express.static(path.join(__dirname, '../client/public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session configuration
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'yariga-dashboard-secret-key-2025',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Session-persisted message middleware
app.use((req, res, next) => {
  const err = req.session.error;
  const msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});

// Routes
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});

// Use route modules
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', propertyRoutes);
app.use('/', agentRoutes);
app.use('/', adminRoutes);
app.use('/', reviewRoutes);
app.use('/', messageRoutes);
app.use('/', profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('=================================');
  console.log('🚀 YARIGA Dashboard Server Started');
  console.log(`📡 Server running on port ${PORT}`);
  console.log('🌐 Access URLs:');
  console.log(`   Login: http://localhost:${PORT}/login`);
  console.log(`   Home:  http://localhost:${PORT}/`);
  console.log('👤 Default Admin Credentials:');
  console.log('   Username: admin');
  console.log('   Password: admin123');
  console.log('=================================');
});

module.exports = app;
