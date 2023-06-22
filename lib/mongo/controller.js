import TrackReviews  from "../models/trackReview"

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
        
        if(!trackReviewData) {
            console.log("hi")
         return res.status(404).json( { error: "Data not Provided"})
        }

        console.log(trackReviewData)
        // TrackReviews.create(trackReviewData, function(err, data) {
            
        // return res.status(200).json(data)
        // })

        TrackReviews.create(trackReviewData)
        .then((result) => {
            return res.status(200).json(trackReviewData)
        })

    } catch (error) {
        res.status(404).json({error: "Error While Posting Data"})

    }
}