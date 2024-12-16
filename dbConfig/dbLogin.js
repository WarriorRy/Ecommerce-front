// lib/mongodb.js

import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = `${process.env.MONGODB_URI}?tls=true&tlsAllowInvalidCertificates=true`;

const options = {};
let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri, options);
    await client.connect();
  }
  return client.db(); // Returns the database instance
};

export default connectToDatabase;
