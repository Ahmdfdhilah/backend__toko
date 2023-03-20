import mysql from "mysql2/promise";

const db =  async () => {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
      });
    try{
        const query = "SELECT * FROM `project-1`.items";
        const values = [];
        const [data] = await connection.execute(query, values);
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

export default db;