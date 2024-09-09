import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"
import { client } from "../../../lib/mongodb";
export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user){
        return res.status(400).json({message: "unauthorized"})
    }
    console.log(req.body.task)
    const database = client.db("tasks");
    const haiku = database.collection("task");
    const doc = {
        task: req.body.task,
        email: session.user.email
    }
    const result = await haiku.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result}`);





    res.status(200).json({ result: {
        _id: result.insertedId,
        task: req.body.task
    } });

    
  }
  