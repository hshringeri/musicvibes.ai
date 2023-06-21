import clientPromise from '.'

let client
let db
let songReviews

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db()
        songReviews = await db.collection('song_reviews')    
    } catch (error) {
        throw new Error("Failed to establish connection to database")
    }
}

;(async () => {
    await init()
})

