import AlbumReviews  from "../../models/albumReview"
const axios = require('axios');


export async function getAlbumReviews(req, res) {
    try {
        console.log("here")
      const albumReviews = await AlbumReviews.find({});
      console.log("here")
      if (!albumReviews) {
        return res.status(404).json({ error: "Data not Found" });
      }
      return res.status(200).json(albumReviews);
    } catch (error) {
      return res.status(404).json({ error: "Error While Fetching Data" });
    }
}


export async function addAlbumReview(req, res) {
    try {
        const albumReviewData = req.body
        console.log(albumReviewData)
        console.log(albumReviewData.album_data[0])
        const albumReview = albumReviewData.review
        const album = albumReviewData.album_data[0]

        if(!albumReviewData) {
            console.log("hi")
         return res.status(404).json( { error: "Data not Provided"})
        }
        
        try {

            const score_res = await axios.post('https://api.openai.com/v1/completions', {
            
                model: 'text-davinci-003',
                prompt: `Give score with no other text for the track ${album} out of a 100 based on this review: ${albumReview}`
        
            }, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
                }
            })
            console.log("youre here!!!!!!!!!!!!!!!!")
            console.log(score_res.data.choices[0].text)
            const str = score_res.data.choices[0].text
            const numberRegex = /\d+/;
            const match = str.match(numberRegex);
            const parsedNumber = match ? parseInt(match[0]) : NaN;
            console.log(parsedNumber)

            albumReviewData.score = parsedNumber
        } catch (error) {
            console.log(error.response.data)
        }
        
        console.log(albumReviewData.score)

        console.log(albumReviewData)
        console.log("u got here and failed")
        AlbumReviews.create(albumReviewData)
        .then((result) => {
            return res.status(200).json(albumReviewData)
        })

    } catch (error) {
        console.log("hi")
        
        res.status(404).json({error: "huh u suck"})

    }
}