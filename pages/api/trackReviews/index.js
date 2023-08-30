import connectMongo from '../../../lib/mongo/index.js';
import { getTrackReviews, addTrackReview, getTrackReviewsbyId } from '../../../lib/mongo/trackReview/controller.js';
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
  // Run the cors middleware
  console.log("hekk")
  await runMiddleware(req, res, cors);

  try {
    connectMongo();
    console.log("bives");
  } catch (error) {
    return res.status(405).json({ error: "Error in the connection" });
  }

  const { method } = req;
  console.log(method);

  switch (method) {
    case 'GET':
      console.log(" we are here!!  ");
      getTrackReviews(req, res);
      break;
    case 'POST':
      console.log("hello");
      addTrackReview(req, res);
      break;
    case 'PUT':
      res.status(200).json({ method, name: 'PUT Request' });
      break;
    case 'DELETE':
      res.status(200).json({ method, name: 'DELETE Request' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
