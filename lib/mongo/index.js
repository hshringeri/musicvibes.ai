import { MongoClient } from 'mongodb'

let dbConnection

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(process.env.MONGO_DB_URI)
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection 
}