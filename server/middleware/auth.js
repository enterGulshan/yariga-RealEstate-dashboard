const User = require('../models/User');

// Authentication function
const authenticate = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return null;
    
    const isMatch = await user.comparePassword(password);
    return isMatch ? user : null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Middleware to restrict access to authenticated users
const restrict = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
};

// Create default admin user if not exists
const createDefaultUser = async () => {
  try {
    const userExists = await User.findOne({ username: 'admin' });
    if (!userExists) {
      await User.create({
        username: 'admin',
        name: 'Administrator',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Default admin user created (username: admin, password: admin123)');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
};

module.exports = {
  authenticate,
  restrict,
  createDefaultUser
};
