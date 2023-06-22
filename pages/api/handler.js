import { connectMongo } from '../../lib/mongo/index'

export default function handler(req, res) {
    connectMongo()

}

