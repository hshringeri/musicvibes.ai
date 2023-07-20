const axios = require('axios');

export async function getPlaylist(req, res) {
    try {
        console.log("hi")
        console.log(req.query.mood)
        const mood = req.query.mood
        const prompt = `Create 50 song playlist based on this mood/topic: ${mood}`
        const playlistData = await axios.post('https://api.openai.com/v1/completions', {  
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 800,
    
        }, {
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
            }
        })
        console.log(playlistData)
        const playlist = playlistData.data.choices[0].text
        const list = formatSongTitles(playlist)
        console.log(list)

        return res.status(200).json(list)

    } catch(error) {
        console.log(error.response)
    }

}

function formatSongTitles(songString) {
    var songTitles = songString.split("\n");
    var formattedTitles = [];
  
    for (var i = 0; i < songTitles.length; i++) {
      var title = songTitles[i];
      var formattedTitle = title.replace(/['"-]/g, "").replace(/\d+\./g, "").trim();
      formattedTitles.push(formattedTitle);
    }
  
    return formattedTitles;
}