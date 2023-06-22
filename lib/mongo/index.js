import mongoose from 'mongoose'

const connectMongo = async() => {
    try {
        const { connection } = await mongoose.connect(process.env.DB_CONN_STRING)
        if(connection.readyState == 1) {
            console.log("Database Connected")
        }
    } catch (errors) {
        console.log('error boy')
        return Promise.reject(errors)
        
    }
}

export default connectMongo