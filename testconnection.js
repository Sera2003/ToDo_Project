const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
  } catch (err) {
    console.error('Connection to MongoDB failed:', err);
  } finally {
    await client.close();
  }
}

testConnection();
