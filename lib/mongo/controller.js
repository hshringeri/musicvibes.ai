import TrackReviews  from "../models/trackReview"
import mongoose from 'mongoose'
import openai from '../openai/configuration.js'
const axios = require('axios');


export async function getTrackReviews(req,res) {
    try {
        const trackReview =  await TrackReview.find({})

        if(!trackReview) return res.status(404).json( { error: "Data not Found"})
        res.status(200).json(trackReview)
    } catch (error) {
        res.status(404).json({error: "Error While Fetching Data"})
    }
}

export async function addTrackReview(req, res) {
    try {
        const trackReviewData = req.body
        console.log(trackReviewData.track[0])
        const trackReview = trackReviewData.review
        const track = trackReviewData.track[0]
        
        try {

            const score_res = await axios.post('https://api.openai.com/v1/completions', {
            
                model: 'text-davinci-003',
                prompt: `Give score with no other text for the track ${track} out of a 100 based on this review: ${trackReview}`
        
            }, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
                }
            })

            console.log(score_res.data.choices[0].text)
            const str = score_res.data.choices[0].text
            const numberRegex = /\d+/;
            const match = str.match(numberRegex);
            const parsedNumber = match ? parseInt(match[0]) : NaN;
            console.log(parsedNumber)

            trackReviewData.score = parsedNumber
        } catch (error) {
            console.log(error.response.data)
        }
        
        console.log(trackReviewData.score)
        
        
        if(!trackReviewData) {
            console.log("hi")
         return res.status(404).json( { error: "Data not Provided"})
        }

        console.log(trackReviewData)
        TrackReviews.create(trackReviewData)
        .then((result) => {
            return res.status(200).json(trackReviewData)
        })

    } catch (error) {
        
        res.status(404).json({error: "Error While Posting Data"})

    }
}