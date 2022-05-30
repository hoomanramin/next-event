import {MongoClient} from "mongodb";

const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://hoomanramin:h2296360981@cluster0.k03kg.mongodb.net/?retryWrites=true&w=majority"
  );
  return client;
};

const insertedDocument = async (client, document) => {
  const db = client.db("events");
  await db.collection("newsletter").insertOne(document);
};

const NewsHandler = async (req, res) => {
  if (req.method === "POST") {
    const emailData = req.body.email;
    if (!emailData || !emailData.includes("@")) {
      res.status(422).json({message: "invalid Email"});
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({message: "Failed To connet to database"});
      return;
    }
    try {
      await insertedDocument(client, {email: emailData});
      client.close();
    } catch (error) {
      res.status(500).json({message: "inserting data failed"});
    }

    res.status(201).json({message: "Sign up Success"});
  }
};

export default NewsHandler;
