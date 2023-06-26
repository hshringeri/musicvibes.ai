import { Schema, models, model } from 'mongoose'

const trackSchema = new Schema({
    id: {type: String, unique: true },
    track_data: [String],
    score: Number,
    ai_review: String,
    review_string: String,
    review_count: Number


})

  

const Tracks = models.track|| model('track', trackSchema, 'tracks')
export default Tracks