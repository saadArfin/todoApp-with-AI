
import { MongoClient } from "mongodb";
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URI;
// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

export {client}