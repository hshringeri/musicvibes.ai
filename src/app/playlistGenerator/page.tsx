"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import ThoughtsLogo from '../images/DALL·E 2023-08-03 23.12.54 - cyberpunk dj.png'
import { useState, useEffect, FC } from 'react'
const axios = require('axios');
import { access } from 'fs'
import { getPlaylist, createPlaylist } from "../../../lib/helpers/playlistGenerator.js"
import TrackCard from '../TrackCard'
import { useSearchParams } from 'next/navigation'
import { getAccessToken } from '../../../lib/helpers/accessToken'


const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const redirect_uri = BASE_URL + '/playlistGenerator'



interface pageProps {
}
const Page: FC<pageProps> = ({}) => {
    const [search, setSearch] = useState("")
    const [songs, setSongs] = useState([])
    const [accessToken, setAccessToken] = useState("")
    const [authorizedAccessToken, setAuthorizedAccessToken] = useState("")
    const [spotifyTracks, setSpotifyTracks] = useState<any[]>([])
    const [userId, setUserId] = useState("")

    console.log(accessToken)
    console.log(authorizedAccessToken)
    console.log(userId)

    const searchParams = useSearchParams()
    const code = searchParams?.get('code')


    console.log(code)
    const getAuthorizedAccessToken = () => {
      console.log("hi")
        const authOptions = {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            code: code || "",
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
    
          setAuthorizedAccessToken(access_token)
      })
      .catch(error => {
          console.error('Error:', error);
      });

    }

    const getId = async () => {
      console.log(authorizedAccessToken)
      const params = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authorizedAccessToken
        }
      };

    console.log(authorizedAccessToken)
    const me =  await fetch('https://api.spotify.com/v1/me', params)
      .then(response => response.json())
      .then(data => {
            console.log(data);
            console.log(data.id);
            setUserId(data.id)
            
        }); 

    }

    useEffect(() => {
      console.log(authorizedAccessToken)
      getId()
    },[authorizedAccessToken])


    useEffect(() => {
        // API Access Token
        var authParams = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    
        } 
        fetch('https://accounts.spotify.com/api/token', authParams)
        .then(result => result.json())
        .then(data => {
          if (!authorizedAccessToken) {
            setAccessToken(data.access_token)
          } else {
            setAuthorizedAccessToken(data.access_token)
          }
          })

            
    }, [])


      const fetchSongs = async () => {
        const tracks = [];
        console.log(songs)
        for (let i = 0; i < songs.length; i++) {
          const song = songs[i];
          console.log(song);
          console.log(i);
          if (i > 1) {
            console.log(song);
            const track = await getTrack(song);
            tracks.push(track);
            console.log(track);
          }
        }
        
        console.log(tracks)
        setSpotifyTracks(tracks);
      };

      useEffect(() => {
        fetchSongs()
      },[songs])


    const getTrack = async (track: string) => {
        const params = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        };
      
        const searchData = await fetch('https://api.spotify.com/v1/search?q=' + track + '&type=track', params)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            console.log(data.tracks.items[0]);
            return data.tracks.items[0];
          });

        
      
        return searchData;
    };

    async function fetchPlaylist() {
        console.log("hi")
        console.log(search)
        const playlist = await getPlaylist(search)
        console.log(playlist)
        setSongs(playlist[0])
    }

    console.log(spotifyTracks)

    const buttonStyle = {
        background: 'none',
        border: 'none',
        padding: '0',
        font: 'inherit',
        cursor: 'pointer',
    };


    const login = () => {
      const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private'
      let url = 'https://accounts.spotify.com/authorize?'
      url += 'client_id=' + CLIENT_ID
      url += '&response_type=code'
      url += "&redirect_uri=" + encodeURI(redirect_uri)
      url += "&scope=" + scope
      window.location.href = url

      
    }

    const onLogin = () => {
      login()
    }

    const addToPlaylist = () => {
      if(!authorizedAccessToken)
        getAuthorizedAccessToken()

      const playlistData = {
        user_id: userId,
        access_token: authorizedAccessToken,
        playlist_songs: spotifyTracks,
        playlist_title: search
      }
      console.log(playlistData)
      createPlaylist(playlistData)

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="relative flex flex-col items-center before:absolute before:h-[300px] before:w-[900px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
                <h1 style={{color: 'black'}} className="z-20 w-full max-w-5xl items-center justify-between font-mono text-5xl lg:flex">whats the vibe</h1>
                <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert rounded-full"
                src={ThoughtsLogo}
                alt="Next.js Logo"
                width={400}
                height={37}
                priority
                />

            <br></br>
            <input
                type="text"
                className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
                placeholder="vibe for the ride"
                value={search}
                onChange={(e) => setSearch(e.target.value)}

            />

            <Button onClick={fetchPlaylist} style={buttonStyle}>
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                submit
            </div>
            </Button>

        </div>

        <Container className="mt-16">
  
        <Row className= "mx-2 row rows-cols-4">          
          <h1 style={{color: 'black'}} className="z-20 w-full max-w-5xl items-center justify-between font-mono text-5xl lg:flex">tracks</h1>
       
          {spotifyTracks.map((spotifyTrack, i) => {
            console.log(spotifyTrack)
            console.log(i)
            console.log(spotifyTrack)
            if (spotifyTrack)
              return (
                <Col md="3" key={i}>
                  <TrackCard 
                      id={spotifyTrack.id ? spotifyTrack.id : ""}
                      name={spotifyTrack.name ? spotifyTrack.name : ""}
                      artist={spotifyTrack.artists[0].name ? spotifyTrack.artists[0].name : ""}
                      score={0}  
                      image={spotifyTrack.album.images[0].url}     
                  />
                  </Col>
                );
  
        })}
          
        </Row>
        </Container>
        <Button onClick={onLogin}>login</Button>
        <Button onClick={addToPlaylist}>add to playlist</Button>

        </main>

    )
}

export default Page;