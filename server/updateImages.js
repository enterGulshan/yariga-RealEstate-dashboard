const mongoose = require('mongoose');
const Property = require('./models/Property');

// Better image URLs from Unsplash
const imageUrls = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // luxury hotel
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // modern apartment
  'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // villa
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // house
  'https://images.unsplash.com/photo-1505843795480-5cfb3c03f6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // duplex
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // office
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // penthouse
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // studio
  'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // condo
  'https://images.unsplash.com/photo-1600607688960-e095b89b96b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // loft
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // mansion
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // townhouse
];

async function updatePropertyImages() {
  try {
    await mongoose.connect('mongodb://localhost:27017/yariga');
    console.log('Connected to MongoDB');

    const properties = await Property.find();
    console.log(`Found ${properties.length} properties`);

    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      const newImageUrl = imageUrls[i % imageUrls.length];
      
      await Property.findByIdAndUpdate(property._id, { image: newImageUrl });
      console.log(`Updated ${property.title} with new image`);
    }

    console.log('✅ All property images updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
}

updatePropertyImages();
