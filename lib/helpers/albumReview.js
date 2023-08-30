import openai from '../openai/configuration.js'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const addAlbumReview = async(albumReview) => {
    console.log("bent brow")
    console.log(albumReview.album_data[0])
    const review = albumReview.review
    const album = albumReview.album_data[0]
    
    console.log(JSON.stringify(albumReview))
    
    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(albumReview)
        }
        console.log(JSON.stringify(albumReview))
        console.log(`${BASE_URL}/api/albumReviews`)
        const response = await fetch(`${BASE_URL}/api/albumReviews`, Options)
        console.log(response)
        const json = await response.json()
        return json
    } catch (error) {
        console.log('Failed to add album review')
        throw error
    }
}

export const getAlbumReviews = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/albumReviews/`); 
      const json = await response.json();
      console.log(id)
      console.log(json)
      const albumReviews = json.filter(review => review.id === id);
      console.log(albumReviews)
      return albumReviews;
    } catch (error) {
      console.error('Failed to get album review:', error);
      throw error;
    }
  };