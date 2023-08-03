const axios = require('axios');

export async function getPlaylist(req, res) {
    try {
        console.log("hi")
        console.log(req.query.mood)
        const mood = req.query.mood
        const prompt = `Create a 50 track playlist based on this mood/vibe: ${mood}. Format each song like: song artist. Don't add anything else but the songs to the response.`
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

    console.log(songString)
  
    for (var i = 0; i < songTitles.length; i++) {
      var title = songTitles[i];
      var formattedTitle = title.replace(/['"-]/g, "").replace(/\d+\./g, "").trim();
      formattedTitles.push(formattedTitle);
    }
  
    return formattedTitles;
}

export async function createPlaylist(req, res) {
    try {

        const userId = req.body.user_id
        const playlistSongs = req.body.playlist_songs
        const authorizedAccessToken = req.body.access_token
        const title = req.body.playlist_title

        const playlist_data = {
            name: title
        }
        console.log("cool")
        console.log(authorizedAccessToken)

        const params = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authorizedAccessToken
            },
            body: JSON.stringify(playlist_data)
        };

        const playlist =  await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, params)
        
        const playlistJson = await playlist.json()
        const playlistId = playlistJson.id 
        console.log(playlistJson)
        console.log(playlistId)
        console.log("hi")
        console.log(userId)
        const songUris = convertSongstoUris(playlistSongs)
        console.log('awesomdogs')
        console.log(songUris)


        const addToParams = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authorizedAccessToken
            },
            body: JSON.stringify(songUris)
        }

        const addToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, addToParams)
        console.log("we heeeeeeee")
        console.log(addToPlaylist)
        return res.status(200).json(addToPlaylist)



    } catch(error) {
        console.log(error)
    }
}

function convertSongstoUris(playlistSongs) {
    var uris = []

    for (var i = 0; i < playlistSongs.length; i++) {
        var uri = playlistSongs[i].uri

        uris.push(uri)
    }

    return uris
}