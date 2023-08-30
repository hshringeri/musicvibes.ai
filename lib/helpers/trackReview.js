import openai from '../openai/configuration.js'
require("dotenv").config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("hi")
console.log("url: " + BASE_URL)
console.log(process.env.DB_CONN_STRING)
export const addTrackReview = async(trackReview) => {
    
    console.log(trackReview.track[0])
    const review = trackReview.review
    const track = trackReview.track[0]
    
    console.log(JSON.stringify(trackReview))
    
    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(trackReview)
        }
        console.log(`url: ${BASE_URL}/api/trackReviews`)
        const response = await fetch(`${BASE_URL}/api/trackReviews`, Options)
        console.log(response)
        const json = await response.json()
        return json
    } catch (error) {
        return error
    }
}

export const getTrackReviews = async (id) => {
    try {
      console.log(BASE_URL)
      console.log(`url: ${BASE_URL}/api/trackReviews`)
      const response = await fetch(`${BASE_URL}/api/trackReviews/`); 
      const json = await response.json();
      console.log(id)
      console.log(json)
      const trackReviews = json.filter(review => review.id === id);
      console.log(trackReviews)
      return trackReviews;
    } catch (error) {
      console.error('Failed to get track review:', error);
      throw error;
    }
  };