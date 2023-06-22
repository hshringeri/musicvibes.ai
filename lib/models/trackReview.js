import { Schema, models, model } from 'mongoose'

const trackReviewSchema = new Schema({
    track: [String],
    review: String,
    score: Number

})

const TrackReviews = models.trackReview || model('trackReview', trackReviewSchema)
export default TrackReviews