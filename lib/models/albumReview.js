import { Schema, models, model } from 'mongoose'

const albumReviewSchema = new Schema({
    id: String,
    album: [String],
    review: String,
    score: Number

})

  

const AlbumReviews = models.albumReview|| model('albumReview', albumReviewSchema, 'album_reviews')
export default AlbumReviews