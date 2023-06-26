import Tracks from "../../models/track";
const axios = require('axios');


export async function getTracks(req, res) {
    try {
        console.log("here")
      const tracks = await Tracks.find({});
      console.log("here")
      if (!tracks) {
        return res.status(404).json({ error: "Data not Found" });
      }
      return res.status(200).json(tracks);
    } catch (error) {
      return res.status(404).json({ error: "Error While Fetching Data" });
    }
}

export async function addTrack(req, res) {
    try {
        const trackData = req.body

        console.log(trackData.track_data[0])
        const trackReviews = trackData.review_string
        const track = trackData.track_data[0]
        const artist = trackData.track_data[1]
        const score = trackData.score

        console.log(trackData)
        
        const prompt = `Based on these reviews: ${trackReviews} for ${track} by ${artist} generate a 1 sentence review on the song`
        const promptWords = prompt.split(' ')
        const promptWordsSize = promptWords.length

        if(!trackData) {
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

                console.log(trackData)

                const data = {
                    id: trackData.id,
                    track: trackData.track_data,
                    score: score,
                    ai_review: ai_review
                }

                

                Tracks.updateOne(data)
                .then((result) => {
                    return res.status(200).json(track)
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
        
        res.status(404).json({error: "Error While Posting Data"})

    }
}

