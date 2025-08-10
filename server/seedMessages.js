const mongoose = require('mongoose');
const Message = require('./models/Message');
const User = require('./models/User');
const connectDB = require('./config/db');

async function seedMessages() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/yariga', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing messages
    await Message.deleteMany({});
    console.log('Cleared existing messages');

    // Get existing users (need at least 2 users for messaging)
    const users = await User.find().limit(5);
    
    if (users.length < 2) {
      console.log('Need at least 2 users to create messages. Creating sample users...');
      
      // Create sample users if not enough exist
      const sampleUsers = [
        {
          username: 'jane.cooper',
          name: 'Jane Cooper',
          password: 'password123',
          email: 'jane.cooper@yariga.com',
          profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        {
          username: 'jubed.ahmed',
          name: 'Jubed Ahmed',
          password: 'password123',
          email: 'jubed.ahmed@yariga.com',
          profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
        },
        {
          username: 'maniuzi.islam',
          name: 'Maniuzi Islam Nabil',
          password: 'password123',
          email: 'maniuzi.islam@yariga.com',
          profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        {
          username: 'hussain.ahmed',
          name: 'Hussain Ahmed',
          password: 'password123',
          email: 'hussain.ahmed@yariga.com',
          profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
        }
      ];

      for (const userData of sampleUsers) {
        const existingUser = await User.findOne({ username: userData.username });
        if (!existingUser) {
          await User.create(userData);
        }
      }
      
      // Refresh users list
      const updatedUsers = await User.find().limit(5);
      users.push(...updatedUsers.filter(u => !users.find(existing => existing._id.equals(u._id))));
    }

    if (users.length < 2) {
      console.log('Still not enough users. Exiting...');
      process.exit(1);
    }

    console.log(`Found ${users.length} users for messaging`);

    // Create sample messages between users
    const sampleMessages = [
      // Conversation 1: Admin with Jane Cooper
      {
        senderId: users[1]._id, // Jane Cooper
        receiverId: users[0]._id, // Admin
        senderName: users[1].name,
        senderAvatar: users[1].profilePicture,
        content: 'Hello! How are you? 👋',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        senderId: users[0]._id, // Admin
        receiverId: users[1]._id, // Jane Cooper
        senderName: users[0].name,
        senderAvatar: users[0].profilePicture || `https://ui-avatars.com/api/?name=${users[0].name}`,
        content: 'Im good 😊 and you...? How can how help you...?',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000) // 1.5 hours ago
      },
      {
        senderId: users[1]._id, // Jane Cooper
        receiverId: users[0]._id, // Admin
        senderName: users[1].name,
        senderAvatar: users[1].profilePicture,
        content: 'I need a photo of your house bulling front view, because its not in the description.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
      },
      {
        senderId: users[0]._id, // Admin
        receiverId: users[1]._id, // Jane Cooper
        senderName: users[0].name,
        senderAvatar: users[0].profilePicture || `https://ui-avatars.com/api/?name=${users[0].name}`,
        content: 'Okay wait...',
        timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
      },
      {
        senderId: users[1]._id, // Jane Cooper
        receiverId: users[0]._id, // Admin
        senderName: users[1].name,
        senderAvatar: users[1].profilePicture,
        content: 'Thank you! 😊',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop']
      }
    ];

    // Add messages with other users if available
    if (users.length >= 3) {
      // Conversation with third user
      sampleMessages.push(
        {
          senderId: users[2]._id,
          receiverId: users[0]._id,
          senderName: users[2].name,
          senderAvatar: users[2].profilePicture || `https://ui-avatars.com/api/?name=${users[2].name}`,
          content: 'Hello, How are you...',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
        },
        {
          senderId: users[0]._id,
          receiverId: users[2]._id,
          senderName: users[0].name,
          senderAvatar: users[0].profilePicture || `https://ui-avatars.com/api/?name=${users[0].name}`,
          content: 'How can I help you...?',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000) // 2.5 hours ago
        }
      );
    }

    if (users.length >= 4) {
      // Conversation with fourth user
      sampleMessages.push(
        {
          senderId: users[3]._id,
          receiverId: users[0]._id,
          senderName: users[3].name,
          senderAvatar: users[3].profilePicture || `https://ui-avatars.com/api/?name=${users[3].name}`,
          content: 'I need a photo for see..',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
        }
      );
    }

    // Insert sample messages
    await Message.insertMany(sampleMessages);
    console.log('Sample messages inserted successfully');

    console.log(`${sampleMessages.length} messages have been added to the database`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding messages:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedMessages();
