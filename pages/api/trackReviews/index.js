import connectMongo  from '../../../lib/mongo/index.js'
import { getTrackReviews, addTrackReview } from '../../../lib/mongo/controller.js'

export default function handler(req, res) {
   try { 
    connectMongo()
   } catch(error) {
        res.status(405).json({error :"Error in the connection"})
   }
    const {method} = req

    switch(method) {
        case 'GET':
            res.status(200).json({method, name: 'GET Request'})
            break
        case 'POST':
            addTrackReview(req,res)
            break
        case 'PUT':
            res.status(200).json({method, name: 'PUT Request'})
            break
        case 'DELETE':
            res.status(200).json({method, name: 'DELETE Request'})
            break
        default:
            res.setHEader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method${method}Not Allowed`)
    }

    

}