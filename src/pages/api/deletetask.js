import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"
import { client } from "../../../lib/mongodb";
import { ObjectId } from "mongodb"; // Import ObjectId from MongoDB

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user){
        return res.status(400).json({message: "unauthorized"})
    }
    // console.log(req.body.task)
    const database = client.db("tasks");
    const haiku = database.collection("task");
    
    const query = { _id : new ObjectId(req.body.id) };
    console.log(query)
    const result = await haiku.deleteOne(query);
    console.log(`A document was deleted with the _id: ${result}`);

    res.status(200).json({ result });

}