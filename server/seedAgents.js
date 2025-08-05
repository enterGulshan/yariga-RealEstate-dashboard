const mongoose = require('mongoose');
const Agent = require('./models/Agent');
const connectDB = require('./config/db');

const sampleAgents = [
  {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@yariga.com",
    phone: "+1 (555) 123-4567",
    city: "New York",
    state: "NY",
    country: "United States",
    agency: "Yariga Realty",
    agentLicense: "RE12345678",
    taxNumber: "TAX123456789",
    serviceArea: "New York Metropolitan Area",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    totalListings: 45,
    propertiesSold: 32,
    propertiesRent: 8
  },
  {
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@yariga.com",
    phone: "+1 (555) 234-5678",
    city: "San Francisco",
    state: "CA",
    country: "United States",
    agency: "Yariga Realty",
    agentLicense: "RE23456789",
    taxNumber: "TAX234567890",
    serviceArea: "San Francisco Bay Area",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    totalListings: 67,
    propertiesSold: 48,
    propertiesRent: 15
  },
  {
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@yariga.com",
    phone: "+1 (555) 345-6789",
    city: "Los Angeles",
    state: "CA",
    country: "United States",
    agency: "Yariga Realty",
    agentLicense: "RE34567890",
    taxNumber: "TAX345678901",
    serviceArea: "Greater Los Angeles",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    totalListings: 38,
    propertiesSold: 29,
    propertiesRent: 6
  },
  {
    firstName: "David",
    lastName: "Thompson",
    email: "david.thompson@yariga.com",
    phone: "+1 (555) 456-7890",
    city: "Chicago",
    state: "IL",
    country: "United States",
    agency: "Yariga Realty",
    agentLicense: "RE45678901",
    taxNumber: "TAX456789012",
    serviceArea: "Chicago Metropolitan Area",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    totalListings: 89,
    propertiesSold: 65,
    propertiesRent: 20
  },
  {
    firstName: "Jessica",
    lastName: "Wilson",
    email: "jessica.wilson@yariga.com",
    phone: "+1 (555) 567-8901",
    city: "Miami",
    state: "FL",
    country: "United States",
    agency: "Yariga Realty",
    agentLicense: "RE56789012",
    taxNumber: "TAX567890123",
    serviceArea: "Miami-Dade County",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    totalListings: 28,
    propertiesSold: 22,
    propertiesRent: 4
  },
  {
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.martinez@yariga.com",
    phone: "+1 (555) 678-9012",
    city: "Austin",
    state: "TX",
    country: "United States",
    agency: "Yariga Realty",
    agentLicense: "RE67890123",
    taxNumber: "TAX678901234",
    serviceArea: "Austin Metropolitan Area",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    totalListings: 52,
    propertiesSold: 41,
    propertiesRent: 9
  }
];

async function seedAgents() {
  try {
    console.log('🌱 Starting agent seeding process...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing agents
    await Agent.deleteMany({});
    console.log('📝 Cleared existing agents');
    
    // Insert sample agents
    const createdAgents = await Agent.insertMany(sampleAgents);
    console.log(`✅ Successfully created ${createdAgents.length} sample agents`);
    
    // Display created agents
    console.log('\n📋 Created Agents:');
    createdAgents.forEach((agent, index) => {
      console.log(`${index + 1}. ${agent.fullName} - ${agent.city}, ${agent.state}`);
    });
    
    console.log('\n🎉 Agent seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding agents:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAgents();
}

module.exports = seedAgents;
