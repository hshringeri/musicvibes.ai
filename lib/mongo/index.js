import { MongoClient } from 'mongodb'

let dbConnection

module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect('mongodb+srv://hardhi-mongodb:mongdb-pass123@cluster0.ix7wsdo.mongodb.net/?retryWrites=true&w=majority')
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