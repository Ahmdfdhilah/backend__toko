import db from '../db/db';
const database = db();

export default async (req, res) => {
   const data = await database;
   res.status(200).json({results: data});
}
