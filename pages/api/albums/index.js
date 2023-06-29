import connectMongo  from '../../../lib/mongo/index.js'
import { addAlbum, getAlbums } from '../../../lib/mongo/album/controller.js'

export default function handler(req, res) {
   try { 
    connectMongo()
   } catch(error) {
        res.status(405).json({error :"Error in the connection"})
   }
    const {method} = req

    switch(method) {
        case 'GET':
            getAlbums(req, res)
            break
        case 'POST':
            res.status(200).json({method, name: 'POST Request'})
            break
        case 'PUT':
            addAlbum(req,res)
            break
        case 'DELETE':
            res.status(200).json({method, name: 'DELETE Request'})
            break
        default:
            res.setHeader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method${method}Not Allowed`)
    }

    

}