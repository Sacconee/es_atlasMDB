import { MongoClient } from 'mongodb';
const client = new MongoClient("mongodb+srv://lorenzosacchettistud_db_user:3TvF4lu77OUZmYLF@cluster0.byaqo3s.mongodb.net/");
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}