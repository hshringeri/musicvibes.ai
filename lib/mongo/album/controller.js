import Albums from "../../models/album";
const axios = require('axios');


export async function getAlbums(req, res) {
    try {
        console.log("here")
      const albums = await Albums.find({});
      console.log("here")
      if (!albums) {
        return res.status(404).json({ error: "Data not Found" });
      }
      return res.status(200).json(albums);
    } catch (error) {
      return res.status(404).json({ error: "Error While Fetching Data" });
    }
}

export async function addAlbum(req, res) {
    try {
        const albumData = req.body
        console.log("catchy songs")
        const albumReviews = albumData.review_string
        const album = albumData.album_data[0]
        const artist = albumData.album_data[1]
        const score = albumData.score

        console.log(albumData)
        
        const prompt = `Based on these reviews: ${albumReviews} for ${album} by ${artist} generate a 1 sentence review for the album`
        const promptWords = prompt.split(' ')
        const promptWordsSize = promptWords.length

        if(!albumData) {
            console.log("hi")
         return res.status(404).json( { error: "Data not Provided"})
        }

        if (promptWordsSize < 1400) {
            try {

                const ai_rev_res = await axios.post('https://api.openai.com/v1/completions', {  
                    model: 'text-davinci-003',
                    prompt: prompt,
                    max_tokens: 150,
            
                }, {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
                    }
                })

                console.log(ai_rev_res.data)
                const ai_review = ai_rev_res.data.choices[0].text
                console.log(ai_review)

                console.log(albumData)

                const data = {
                    id: albumData.id,
                    album_data: albumData.album_data,
                    score: score,
                    ai_review: ai_review
                }
                console.log("hi ---------")
                console.log(data)

                Albums.findOneAndUpdate({id: albumData.id}, data, { new: true, upsert: true})
                .then((result) => {
                    return res.status(200).json(data)
                })
                
                

            } catch (error) {
                console.log(error.response.data)
            }
        }
        
        // console.log(trackReviewData.score)

        // console.log(trackReviewData)
        // TrackReviews.create(trackReviewData)
        // .then((result) => {
        //     return res.status(200).json(trackReviewData)
        // })

    } catch (error) {
        
        res.status(404).json({error: "Error While Posting Data bitch"})

    }
}

