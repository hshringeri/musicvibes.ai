import connectMongo  from '../../../lib/mongo/index.js'
import { getAlbums, addAlbum} from '../../../lib/mongo/album/controller.js'

import Cors from 'cors';

// Initializing the cors middleware
const cors = Cors({
    origin: 'https://music-vibes-brown.vercel.app',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
});

// Helper method to run middleware manually
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
   try { 
    connectMongo()
   } catch(error) {
        res.status(405).json({error :"Error in the connection"})
   }
    const {method} = req

    switch(method) {
        case 'GET':
            console.log(req)
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