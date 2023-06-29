import { Schema, models, model } from 'mongoose'

const albumSchema = new Schema({
    id: {type: String, unique: true },
    album_data: [String],
    score: Number,
    ai_review: String,


})

  

const Albums = models.album|| model('album', albumSchema, 'albums')
export default Albums