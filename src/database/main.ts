import * as sql_ from "sqlite3"
import * as dbschema from "../shared/dbSchema"
import "../shared/utils/sqlStrings"
import { createTable } from "../shared/utils/sqlStrings"
const sql = sql_.verbose()


const db = new sql.Database(`${__dirname}/data.db`, sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
    if (err) {
        console.error("sql.Database Error:")
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
})


const createTables = dbschema.tables.map(x=>createTable(x))

console.log(createTables.join("\n"))

createTables.forEach(x => {
    db.run(x, (err)=>{
        if(err){
            console.error("db.run Error:")
            return console.error(err)
        }
    })
});



db.close((err) => {
    if (err) {
        console.error("db.close Error:")
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
