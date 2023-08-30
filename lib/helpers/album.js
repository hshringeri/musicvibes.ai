import { getAlbumReviews } from './albumReview.js'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const upsertAlbum = async(album) => {
    const albumId = album.id;

    getAlbumReviews(albumId)
    .then(async albumReviews => {
        const reviews = Object.values(albumReviews).map(review => review.review);
        const scores = Object.values(albumReviews).map(review => review.score);

        const scoreSum = scores.reduce((accumulator, score) => accumulator + score, 0);
        const score = scoreSum / scores.length;
        
        console.log(score)
        let reviewString = "";
        reviews.forEach(review => {
            reviewString += " \"" + review + "\",";
        });

        const words = reviewString.split(" ");
        const wordsCount = words.length;
        console.log(reviewString)
        const data = {
            id: albumId,
            album_data: album.album_data,
            review_string: reviewString,
            score: score
        };
        console.log(data)

        const Options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };

        console.log(`${BASE_URL}/api/albums`);
        const newAlbum = fetch(`${BASE_URL}/api/albums`, Options);
        console.log(newAlbum)
        return newAlbum
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
    })
    .catch(error => {
        console.error(error);
    });

    }

export const getAlbum = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/albums/`); 
      const json = await response.json();
      console.log(id)
      console.log(json)
      const album = json.find((album) => album.id === id);
      return album;
    } catch (error) {
      console.error('Failed to get album:', error);
      throw error;
    }
  };







