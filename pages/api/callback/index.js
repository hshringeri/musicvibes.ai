import { reqAccessToken } from "../../../lib/mongo/callback/controller"

export default function handler(req, res) {
    try { 
     connectMongo()
    } catch(error) {
         res.status(405).json({error :"Error in the connection"})
    }
     const {method} = req
 
     switch(method) {
         case 'GET':
            console.log("hi")
             console.log(req)
             reqAccessToken(req, res)
             console.log("we dem bys")
             break
         case 'POST':
             res.status(200).json({method, name: 'POST Request'})
             break
         case 'PUT':
             res.status(200).json({method, name: 'PUT Request'})
             break
         case 'DELETE':
             res.status(200).json({method, name: 'DELETE Request'})
             break
         default:
             res.setHeader('Allow',['GET', 'POST', 'PUT', 'DELETE'])
             res.status(405).end(`Method${method}Not Allowed`)
     }
 
     
 }