const mongoose = require('mongoose');
const Property = require('./models/Property');

// Sample property data
const sampleProperties = [
  {
    title: "Metro Jayakarta Hotel & Spa",
    price: 7400,
    location: "North Carolina, USA",
    beds: 4,
    area: "28M",
    type: "Hotel",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?luxury-hotel,spa",
    description: "Luxury hotel with spa facilities in prime location"
  },
  {
    title: "Star Sun Hotel & Apartment",
    price: 9600,
    location: "Condong City, USA",
    beds: 6,
    area: "29M",
    type: "Hotel",
    status: "For Rent",
    image: "https://source.unsplash.com/800x600/?hotel-apartment,modern",
    description: "Modern hotel apartment with stunning city views"
  },
  {
    title: "Lavender Apartment",
    price: 5000,
    location: "North Carolina, USA",
    beds: 3,
    area: "25M",
    type: "Apartment",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?modern-apartment,interior",
    description: "Beautiful apartment with modern amenities"
  },
  {
    title: "Skyline Modern Villa",
    price: 12000,
    location: "California, USA",
    beds: 5,
    area: "45M",
    type: "Villa",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?luxury-villa,modern",
    description: "Stunning modern villa with panoramic views"
  },
  {
    title: "Downtown Commercial Space",
    price: 8500,
    location: "New York, USA",
    beds: 0,
    area: "150M",
    type: "Commercial",
    status: "For Rent",
    image: "https://source.unsplash.com/800x600/?office-building,commercial",
    description: "Prime commercial space in downtown area"
  },
  {
    title: "Cozy Family House",
    price: 4500,
    location: "Texas, USA",
    beds: 4,
    area: "35M",
    type: "House",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?family-house,suburban",
    description: "Perfect family home in quiet neighborhood"
  },
  {
    title: "Historic Townhouse",
    price: 4300,
    location: "Boston, MA",
    beds: 3,
    area: "26M",
    type: "Apartment",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?apartment-building",
    description: "Elegant apartment in quiet neighborhood"
  },
  {
    title: "Lotus Apy Hotel & Apartment",
    price: 7950,
    location: "Margouwm California, USA",
    beds: 3,
    area: "25M",
    type: "Hotel",
    status: "For Rent",
    image: "https://source.unsplash.com/800x600/?modern-apartment",
    description: "Luxury hotel apartment with premium amenities"
  },
  {
    title: "Almander Hotel & Apartment",
    price: 7400,
    location: "Sunydeinghampton, UK",
    beds: 2,
    area: "22M",
    type: "Hotel",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?uk-hotel",
    description: "Boutique hotel in the heart of UK"
  },
  {
    title: "Star Sun Hotel & Apartment",
    price: 4400,
    location: "North Carolina, USA",
    beds: 5,
    area: "26M",
    type: "Hotel",
    status: "For Rent",
    image: "https://source.unsplash.com/800x600/?hotel-suite",
    description: "Family-friendly hotel with spacious apartments"
  },
  {
    title: "Metro Jayakarta Hotel & Spa",
    price: 8100,
    location: "North Carolina, USA",
    beds: 4,
    area: "28M",
    type: "Hotel",
    status: "For Sale",
    image: "https://source.unsplash.com/800x600/?spa-hotel",
    description: "Luxury spa hotel with world-class facilities"
  },
  {
    title: "Almander Hotel & Apartment",
    price: 5000,
    location: "Sunydeinghampton, UK",
    beds: 5,
    area: "26M",
    type: "Hotel",
    status: "For Rent",
    image: "https://source.unsplash.com/800x600/?british-hotel",
    description: "Traditional British hotel with modern amenities"
  }
];

async function seedProperties() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/yariga', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    // Insert sample properties
    await Property.insertMany(sampleProperties);
    console.log('Sample properties inserted successfully');

    console.log(`${sampleProperties.length} properties have been added to the database`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding properties:', error);
    process.exit(1);
  }
}

seedProperties();
