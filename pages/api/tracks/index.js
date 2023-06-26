import connectMongo  from '../../../lib/mongo/index.js'
import { addTrack, getTracks } from '../../../lib/mongo/track/controller.js'

export default function handler(req, res) {
   try { 
    connectMongo()
   } catch(error) {
        res.status(405).json({error :"Error in the connection"})
   }
    const {method} = req

    switch(method) {
        case 'GET':
            getTracks(req, res)
            break
        case 'POST':
            res.status(200).json({method, name: 'POST Request'})
            break
        case 'PUT':
            addTrack(req,res)
            break
        case 'DELETE':
            res.status(200).json({method, name: 'DELETE Request'})
            break
        default:
            res.setHeader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method${method}Not Allowed`)
    }

    

}