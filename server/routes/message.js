const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

// Message page
router.get('/message', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    // Get all users for conversation list (excluding current user)
    const users = await User.find({ _id: { $ne: req.session.user.id } })
      .select('username name profilePicture lastLogin')
      .sort({ lastLogin: -1 });

    // Get messages for selected conversation or first user
    const selectedUserId = req.query.userId || (users.length > 0 ? users[0]._id : null);
    let messages = [];
    let selectedUser = null;

    if (selectedUserId) {
      selectedUser = await User.findById(selectedUserId).select('username name profilePicture');
      
      messages = await Message.find({
        $or: [
          { senderId: req.session.user.id, receiverId: selectedUserId },
          { senderId: selectedUserId, receiverId: req.session.user.id }
        ]
      }).sort({ timestamp: 1 });

      // Mark messages as read
      await Message.updateMany(
        { senderId: selectedUserId, receiverId: req.session.user.id, isRead: false },
        { isRead: true }
      );
    }

    // Get last message for each user
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: req.session.user.id, receiverId: user._id },
            { senderId: user._id, receiverId: req.session.user.id }
          ]
        }).sort({ timestamp: -1 });

        return {
          ...user.toObject(),
          lastMessage: lastMessage ? lastMessage.content : 'No messages yet',
          lastMessageTime: lastMessage ? lastMessage.formattedTime : '',
          isActive: user._id.toString() === selectedUserId
        };
      })
    );

    res.render('message', {
      user: req.session.user,
      users: usersWithLastMessage,
      messages,
      selectedUser,
      selectedUserId
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Server Error');
  }
});

// Send message
router.post('/message/send', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const { receiverId, content } = req.body;
    
    if (!receiverId || !content) {
      req.session.error = 'Receiver and message content are required';
      return res.redirect('/message');
    }

    const sender = await User.findById(req.session.user.id);
    
    const newMessage = new Message({
      senderId: req.session.user.id,
      receiverId,
      senderName: sender.name,
      senderAvatar: sender.profilePicture,
      content: content.trim()
    });

    await newMessage.save();
    res.redirect(`/message?userId=${receiverId}`);
  } catch (error) {
    console.error('Error sending message:', error);
    req.session.error = 'Error sending message. Please try again.';
    res.redirect('/message');
  }
});

module.exports = router;
