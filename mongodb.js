const { MongoClient } = require('mongodb');

const URI = process.env.DB_CONN_STRING;
const options = {};

if (!URI) throw new Error("Please add your MongoDB URI to env.local");

const client = new MongoClient(URI, options);
const clientPromise = client.connect();

module.exports = clientPromise;
