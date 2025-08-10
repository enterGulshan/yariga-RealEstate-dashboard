const mongoose = require('mongoose');
const Property = require('../models/Property');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yariga', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedProperties = async () => {
  try {
    // Clear existing properties
    await Property.deleteMany({});
    
    const properties = [
      {
        title: 'Modern Downtown Apartment',
        price: 450000,
        location: 'Manhattan, NY',
        beds: 2,
        area: '85M',
        type: 'Apartment',
        status: 'For Sale',
        description: 'Beautiful modern apartment in the heart of Manhattan with stunning city views.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Luxury Family Villa',
        price: 1200000,
        location: 'Beverly Hills, CA',
        beds: 5,
        area: '320M',
        type: 'Villa',
        status: 'For Sale',
        description: 'Stunning luxury villa with pool, garden, and panoramic views.',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Cozy Beach House',
        price: 3500,
        location: 'Miami Beach, FL',
        beds: 3,
        area: '150M',
        type: 'House',
        status: 'For Rent',
        description: 'Charming beach house just steps from the ocean.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Executive Office Suite',
        price: 8500,
        location: 'Downtown Chicago, IL',
        beds: 0,
        area: '200M',
        type: 'Commercial',
        status: 'For Rent',
        description: 'Premium office space in downtown Chicago business district.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Boutique Hotel Investment',
        price: 2500000,
        location: 'Seattle, WA',
        beds: 25,
        area: '800M',
        type: 'Hotel',
        status: 'For Sale',
        description: 'Boutique hotel with 25 rooms in prime Seattle location.',
        image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Suburban Family Home',
        price: 675000,
        location: 'Austin, TX',
        beds: 4,
        area: '220M',
        type: 'House',
        status: 'For Sale',
        description: 'Perfect family home in quiet suburban neighborhood.',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'City Center Apartment',
        price: 2800,
        location: 'Portland, OR',
        beds: 1,
        area: '65M',
        type: 'Apartment',
        status: 'For Rent',
        description: 'Modern studio apartment in the heart of Portland.',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Luxury Penthouse',
        price: 3200000,
        location: 'San Francisco, CA',
        beds: 3,
        area: '180M',
        type: 'Apartment',
        status: 'For Sale',
        description: 'Exclusive penthouse with 360-degree city views.',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Mountain Retreat Villa',
        price: 950000,
        location: 'Aspen, CO',
        beds: 4,
        area: '280M',
        type: 'Villa',
        status: 'For Sale',
        description: 'Stunning mountain villa with ski-in/ski-out access.',
        image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&h=400&fit=crop&crop=entropy&auto=format'
      },
      {
        title: 'Historic Townhouse',
        price: 4200,
        location: 'Boston, MA',
        beds: 3,
        area: '175M',
        type: 'House',
        status: 'For Rent',
        description: 'Beautifully restored historic townhouse in Back Bay.',
        image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600&h=400&fit=crop&crop=entropy&auto=format'
      }
    ];

    await Property.insertMany(properties);
    console.log('✅ Properties seeded successfully!');
    console.log(`📊 Created ${properties.length} properties`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding properties:', error);
    mongoose.connection.close();
  }
};

seedProperties();
