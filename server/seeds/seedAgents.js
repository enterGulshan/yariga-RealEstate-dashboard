const mongoose = require('mongoose');
const Agent = require('../models/Agent');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yariga', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const seedAgents = async () => {
  try {
    // Clear existing agents
    await Agent.deleteMany({});
    
    const agents = [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@yariga.com',
        phone: '+1 (555) 123-4567',
        country: 'United States',
        city: 'New York',
        state: 'NY',
        agency: 'Yariga Real Estate',
        agentLicense: 'NYS-RE-001234',
        taxNumber: 'TAX-001234567',
        serviceArea: 'Manhattan, Brooklyn, Queens',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=e3f2fd&color=1976d2&size=200&rounded=true&font-size=0.7'
      },
      {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@yariga.com',
        phone: '+1 (555) 234-5678',
        country: 'United States',
        city: 'Los Angeles',
        state: 'CA',
        agency: 'Yariga Real Estate',
        agentLicense: 'CA-RE-005678',
        taxNumber: 'TAX-002345678',
        serviceArea: 'Los Angeles County, Orange County',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=f3e5f5&color=7b1fa2&size=200&rounded=true&font-size=0.7'
      },
      {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@yariga.com',
        phone: '+1 (555) 345-6789',
        country: 'United States',
        city: 'Miami',
        state: 'FL',
        agency: 'Yariga Real Estate',
        agentLicense: 'FL-RE-009012',
        taxNumber: 'TAX-003456789',
        serviceArea: 'Miami-Dade, Broward County',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=fff3e0&color=f57c00&size=200&rounded=true&font-size=0.7'
      },
      {
        firstName: 'David',
        lastName: 'Thompson',
        email: 'david.thompson@yariga.com',
        phone: '+1 (555) 456-7890',
        country: 'United States',
        city: 'Chicago',
        state: 'IL',
        agency: 'Yariga Real Estate',
        agentLicense: 'IL-RE-003456',
        taxNumber: 'TAX-004567890',
        serviceArea: 'Cook County, DuPage County',
        avatar: 'https://ui-avatars.com/api/?name=David+Thompson&background=e8f5e8&color=388e3c&size=200&rounded=true&font-size=0.7'
      },
      {
        firstName: 'Jessica',
        lastName: 'Wang',
        email: 'jessica.wang@yariga.com',
        phone: '+1 (555) 567-8901',
        country: 'United States',
        city: 'Seattle',
        state: 'WA',
        agency: 'Yariga Real Estate',
        agentLicense: 'WA-RE-007890',
        taxNumber: 'TAX-005678901',
        serviceArea: 'King County, Pierce County',
        avatar: 'https://ui-avatars.com/api/?name=Jessica+Wang&background=fce4ec&color=c2185b&size=200&rounded=true&font-size=0.7'
      },
      {
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.miller@yariga.com',
        phone: '+1 (555) 678-9012',
        country: 'United States',
        city: 'Dallas',
        state: 'TX',
        agency: 'Yariga Real Estate',
        agentLicense: 'TX-RE-001122',
        taxNumber: 'TAX-006789012',
        serviceArea: 'Dallas County, Tarrant County',
        avatar: 'https://ui-avatars.com/api/?name=Robert+Miller&background=e0f2f1&color=00695c&size=200&rounded=true&font-size=0.7'
      }
    ];

    await Agent.insertMany(agents);
    console.log('✅ Agents seeded successfully!');
    console.log(`📊 Created ${agents.length} agents`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error seeding agents:', error);
    mongoose.connection.close();
  }
};

seedAgents();
