const User = require('../models/User');

// Function to validate password strength
const validatePasswordStrength = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  if (password.length < minLength) errors.push(`Password must be at least ${minLength} characters long`);
  if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
  if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
  if (!hasNumbers) errors.push('Password must contain at least one number');
  if (!hasSpecialChar) errors.push('Password must contain at least one special character');

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Authentication function with enhanced security
const authenticate = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return null;
    
    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is disabled. Please contact administrator.');
    }

    // Check for too many failed attempts
    if (user.failedLoginAttempts >= 5 && user.lastFailedLogin) {
      const lockoutDuration = 15 * 60 * 1000; // 15 minutes
      const timeSinceLastFailedLogin = Date.now() - user.lastFailedLogin.getTime();
      
      if (timeSinceLastFailedLogin < lockoutDuration) {
        const minutesLeft = Math.ceil((lockoutDuration - timeSinceLastFailedLogin) / 60000);
        throw new Error(`Account is temporarily locked. Please try again in ${minutesLeft} minutes.`);
      } else {
        // Reset failed attempts after lockout period
        user.failedLoginAttempts = 0;
      }
    }

    const isMatch = await user.comparePassword(password);
    
    if (isMatch) {
      // Reset failed attempts on successful login
      user.failedLoginAttempts = 0;
      user.lastLogin = new Date();
      await user.save();
      return user;
    } else {
      // Increment failed attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      user.lastFailedLogin = new Date();
      await user.save();
      return null;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
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

// Middleware to restrict access to admin users only
const restrictToAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    req.session.error = 'Admin access required!';
    res.redirect('/dashboard');
  }
};

// Create default admin user if not exists
const createDefaultUser = async () => {
  try {
    const userExists = await User.findOne({ username: 'admin' });
    if (!userExists) {
      // Create admin with enhanced security
      const adminUser = new User({
        username: 'admin',
        name: 'Administrator',
        password: 'admin123', // Will be automatically hashed by the User model
        role: 'admin',
        email: 'admin@yariga.com',
        isActive: true,
        lastLogin: new Date(),
        profilePicture: 'https://ui-avatars.com/api/?name=Administrator&background=0D8ABC&color=fff'
      });

      await adminUser.save();
      console.log('Default admin user created (username: admin, password: admin123)');
      console.log('Please change the admin password after first login!');
    }
  } catch (error) {
    console.error('Error creating default user:', error);
  }
};

module.exports = {
  authenticate,
  restrict,
  restrictToAdmin,
  createDefaultUser
};
