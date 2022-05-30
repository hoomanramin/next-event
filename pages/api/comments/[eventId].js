import {MongoClient} from "mongodb";

const CommentsHandler = async (req, res) => {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://hoomanramin:h2296360981@cluster0.k03kg.mongodb.net/?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const {email, name, commentText} = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !commentText ||
      commentText.trim() === ""
    ) {
      res.status(422).json({message: "Invalid Input"});
      return;
    }
    const newComment = {eventId, name, email, commentText};

    const db = client.db("events");
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;
    res.status(201).json({message: "Sucsses", comment: newComment});
  }
  if (req.method === "GET") {
    const db = client.db("events");
    const documents = await db
      .collection("comments")
      .find()
      .sort({_id: -1})
      .toArray();

    res.status(200).json({message: "Success", comments: documents});
  }
  client.close();
};

export default CommentsHandler;
