import { connectDatabase, insertedDocument } from "../../helper/db-utils";

const NewsHandler = async (req, res) => {
  if (req.method === "POST") {
    const emailData = req.body.email;
    if (!emailData || !emailData.includes("@")) {
      res.status(422).json({ message: "invalid Email" });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Failed To connet to database" });
      return;
    }
    try {
      await insertedDocument(client, { email: emailData }, "newsletter");
      client.close();
    } catch (error) {
      res.status(500).json({ message: "inserting data failed" });
    }

    res.status(201).json({ message: "Sign up Success" });
  }
};

export default NewsHandler;
