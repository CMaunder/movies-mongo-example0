
import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const {id} = req.query
    let idObj
    try {
        idObj = ObjectId(id)
    } catch(e) {
        res.status(404).json({Message: 'Whoa, that is not a valid id'})
        return 
    }
    console.log(`The id requested is ${idObj}`)
    const { db } = await connectToDatabase();

    const movies = await db
    .collection("movies").findOne({_id: idObj})
    if (movies!==null && movies!==undefined) {
        res.status(200).json(movies)
    } else {
        res.status(404).json({Message: 'Uh oh, no data found'})
        return
    }
};