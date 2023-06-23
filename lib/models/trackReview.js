import { Schema, models, model } from 'mongoose'

const trackReviewSchema = new Schema({
    id: String,
    track: [String],
    review: String,
    score: Number

})

  

const TrackReviews = models.trackReview || model('trackReview', trackReviewSchema, 'track_reviews')
export default TrackReviews