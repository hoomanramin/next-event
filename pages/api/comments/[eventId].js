import {
  connectDatabase,
  getAllDocuments,
  insertedDocument,
} from "../../../helper/db-utils";

const CommentsHandler = async (req, res) => {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Failed To connet to database" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, commentText } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !commentText ||
      commentText.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      client.close();
      return;
    }
    const newComment = { eventId, name, email, commentText };
    let result;
    try {
      result = await insertedDocument(client, newComment, "comments");
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Sucsses", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "inserting data failed" });
    }
  }
  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ message: "Success", comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting Comments Failed" });
    }
  }
  client.close();
};

export default CommentsHandler;
