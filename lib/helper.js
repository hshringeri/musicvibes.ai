import openai from './openai/configuration.js'

const BASE_URL='http://localhost:3000'


export const getTrackReviews = async() => {
    fetch(`${BASE_URL}/api/trackReviews`)
    const json = await Response.json()
}

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
        console.log(`${BASE_URL}/api/trackReviews`)
        const response = await fetch(`${BASE_URL}/api/trackReviews`, Options)
        const json = await response.json()

        return json
    } catch (error) {
        return error
    }
}