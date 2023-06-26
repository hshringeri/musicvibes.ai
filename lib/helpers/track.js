import { getTrackReviews } from './trackReview.js'

const BASE_URL='http://localhost:3000'

export const upsertTrack = async(track) => {
    const trackId = track.id;

    getTrackReviews(trackId)
    .then(trackReviews => {
        const reviews = Object.values(trackReviews).map(review => review.review);
        const scores = Object.values(trackReviews).map(review => review.score);

        const scoreSum = scores.reduce((accumulator, score) => accumulator + score, 0);
        const score = scoreSum / scores.length;

        let reviewString = "";
        reviews.forEach(review => {
            reviewString += " \"" + review + "\",";
        });

        const words = reviewString.split(" ");
        const wordsCount = words.length;
        console.log(reviewString)
        const data = {
            id: trackId,
            track_data: track.track_data,
            review_string: reviewString,
            score: score
        };

        const Options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        console.log(`${BASE_URL}/api/tracks`);
        return fetch(`${BASE_URL}/api/tracks`, Options);
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        // Handle the response data as needed
    })
    .catch(error => {
        console.error(error);
        // Handle any errors that occurred during the promise execution
    });

    }

export const getTrack = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tracks/`); 
      const json = await response.json();
      console.log(id)
      console.log(json)
      const track = json.find((track) => track.id === id);
      return track;
    } catch (error) {
      console.error('Failed to get track:', error);
      throw error;
    }
  };







