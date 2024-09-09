import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]"
import { client } from "../../../lib/mongodb";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user){
        return res.status(400).json({message: "unauthorized"})
    }
   
    const database = client.db("tasks");
    const haiku = database.collection("task");

    const query = { email: session.user.email };

    const cursor = await haiku.find(query, {}).toArray();
    
    console.log(cursor)




    res.status(200).json({ cursor });

    
  }