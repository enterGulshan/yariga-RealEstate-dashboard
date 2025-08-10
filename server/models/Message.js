const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  senderAvatar: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text'
  },
  images: [{
    type: String
  }]
});

// Virtual for formatted time
messageSchema.virtual('formattedTime').get(function() {
  const now = new Date();
  const messageTime = this.timestamp;
  const diffInHours = Math.abs(now - messageTime) / 36e5;
  
  if (diffInHours < 24) {
    return messageTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } else {
    return messageTime.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
