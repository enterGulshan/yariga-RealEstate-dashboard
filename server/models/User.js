const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'agent'],
    default: 'user'
  },
  profilePicture: {
    type: String,
    default: function() {
      const name = this.name || this.username;
      return `https://ui-avatars.com/api/?name=${name.replace(/\s+/g, '+')}&background=random&color=fff&size=400`;
    }
  },
  failedLoginAttempts: {
    type: Number,
    default: 0
  },
  lastFailedLogin: {
    type: Date
  },
  passwordLastChanged: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  passwordResetToken: String,
  passwordResetExpires: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    // Use stronger salt rounds (12 instead of 10)
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Update password change timestamp
    this.passwordLastChanged = new Date();
    
    // Reset failed login attempts when password is changed
    if (this.failedLoginAttempts > 0) {
      this.failedLoginAttempts = 0;
      this.lastFailedLogin = undefined;
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
