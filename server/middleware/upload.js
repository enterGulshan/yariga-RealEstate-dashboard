const multer = require('multer');
const path = require('path');

// Configure storage for property images
const propertyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/images/uploads/properties/'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'property-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure storage for agent images
const agentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/images/uploads/agents/'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'agent-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure storage for user avatars
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/images/uploads/avatars/'));
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Create upload instances
const uploadProperty = multer({
  storage: propertyStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

const uploadAgent = multer({
  storage: agentStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  }
});

const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB limit
  }
});

// Helper function to generate UI Avatar URL
const generateUIAvatar = (name, background = 'random') => {
  const formattedName = name.replace(/\s+/g, '+');
  return `https://ui-avatars.com/api/?name=${formattedName}&background=${background}&color=fff&size=400`;
};

// Helper function to get property image with fallback
const getPropertyImage = (imageUrl, title) => {
  if (imageUrl && imageUrl.startsWith('/images/')) {
    return imageUrl;
  }
  // Use Unsplash as fallback for properties
  const keywords = ['modern-house', 'apartment', 'villa', 'office', 'hotel'];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  return `https://source.unsplash.com/800x600/?${randomKeyword}`;
};

// Helper function to get agent image with UI Avatar fallback
const getAgentImage = (imageUrl, firstName, lastName) => {
  if (imageUrl && imageUrl.startsWith('/images/')) {
    return imageUrl;
  }
  // Use UI Avatar as fallback for agents
  return generateUIAvatar(`${firstName} ${lastName}`);
};

module.exports = {
  uploadProperty,
  uploadAgent,
  uploadAvatar,
  generateUIAvatar,
  getPropertyImage,
  getAgentImage
};
