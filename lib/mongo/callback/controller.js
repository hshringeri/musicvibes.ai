import { access } from "fs";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET

const redirect_uri = 'http://localhost:3000/playlistGenerator'

export function reqAccessToken(req, res) {
    const code = req.query.code || null;
    console.log(code)
    console.log("hi")

    const authOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        })
    };

    const url = 'https://accounts.spotify.com/api/token';

    fetch(url, authOptions)
    .then(response => response.json())
    .then(data => {
        console.log("GEEEEE")
        console.log(data);
        const access_token = data.access_token
        console.log(access_token)
        // Use the data returned from the API here
        console.log("jeez kid")
        console.log(access_token)
        return res.status(200).json(access_token)
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
    
}