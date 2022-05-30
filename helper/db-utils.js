import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://hoomanramin:h2296360981@cluster0.k03kg.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

export const insertedDocument = async (client, document, collection) => {
  const db = client.db("events");
  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  const db = client.db("events");
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
};
