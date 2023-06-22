
const BASE_URL='http://localhost:3000'
export const getTrackReviews = async() => {
    fetch(`${BASE_URL}/api/trackReviews`)
    const json = await Response.json()
}

export const addTrackReview = async(track) => {
    console.log(JSON.stringify(track))
    try {
        const Options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(track)
        }
        console.log(`${BASE_URL}/api/trackReviews`)
        const response = await fetch(`${BASE_URL}/api/trackReviews`, Options)
        const json = await response.json()

        return json
    } catch (error) {
        return error
    }
}