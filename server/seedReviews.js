const mongoose = require('mongoose');
const Review = require('./models/Review');
const connectDB = require('./config/db');

const sampleReviews = [
  {
    reviewId: 'C01234',
    customerName: 'James Sullivan',
    customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    service: 'Friendly service',
    description: 'Josh, Luna and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.',
    dateJoined: new Date('2022-04-25'),
    timePosted: '12:42 AM',
    tags: ['EXCELLENT', 'GREAT', 'BEST SERVICE'],
    status: 'Published',
    actions: { reject: false, approve: true }
  },
  {
    reviewId: 'C01235',
    customerName: 'Jakir Hussein',
    customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    service: 'Friendly service',
    description: 'Josh, Luna and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.',
    dateJoined: new Date('2022-09-15'),
    timePosted: '11:40 AM',
    tags: ['BAD SERVICE', 'UNEXPECTED'],
    status: 'Published',
    actions: { reject: false, approve: true }
  },
  {
    reviewId: 'C01236',
    customerName: 'Deborah Saragi',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    service: 'Friendly service',
    description: 'Josh, Luna and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.',
    dateJoined: new Date('2022-10-15'),
    timePosted: '10:29 PM',
    tags: ['EXCELLENT', 'GREAT', 'BEST SERVICE'],
    status: 'Published',
    actions: { reject: false, approve: true }
  },
  {
    reviewId: 'C01268',
    customerName: 'Delwar Hussein',
    customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    service: 'Friendly service',
    description: 'Josh, Luna and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.',
    dateJoined: new Date('2022-06-15'),
    timePosted: '12:50 AM',
    tags: ['BAD SERVICE', 'UNEXPECTED'],
    status: 'Published',
    actions: { reject: false, approve: true }
  },
  {
    reviewId: 'C01287',
    customerName: 'Jubed Ahmed',
    customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    service: 'Friendly service',
    description: 'Josh, Luna and everyone at Just Property in Hastings deserved a big Thank You from us for moving us from Jakarta to Medan during the lockdown.',
    dateJoined: new Date('2022-04-24'),
    timePosted: '08:42 PM',
    tags: ['EXCELLENT', 'GREAT', 'BEST SERVICE'],
    status: 'Published',
    actions: { reject: false, approve: true }
  }
];

async function seedReviews() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/yariga', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing reviews
    await Review.deleteMany({});
    console.log('Cleared existing reviews');

    // Insert sample reviews
    await Review.insertMany(sampleReviews);
    console.log('Sample reviews inserted successfully');

    console.log(`${sampleReviews.length} reviews have been added to the database`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding reviews:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedReviews();
