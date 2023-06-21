"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC } from 'react'
import AlbumCard  from './AlbumCard'
import { access } from 'fs'

const CLIENT_ID = 'c2841644f9d046419cee01d35ff28d21'
const CLIENT_SECRET = '61829162e0f34e988085f537d32bd319'

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  
  const [searchInput, setSearchInput] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [albums, setAlbums] = useState<any[]>([])
  const [tracks, setTracks] = useState<any[]>([])
  const [artists, setArtists] = useState<any[]>([])
  

  console.log(searchInput)

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
    .then(data => setAccessToken(data.access_token))
  }, [])

  // Search
  async function search(target: string) {
    setSearchInput(target)
    var artistParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    var searchData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist,track,album', artistParams)
    .then(response => response.json())
    .then(data => {
      setAlbums(data.albums ? data.albums.items: [])
      setTracks(data.tracks ? data.tracks.items: [])
      setArtists(data.artists ? data.artists.items: [])
    })

    console.log(albums)
    console.log(tracks)
    console.log(artists)
    
  }

 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
         new way to look at reviews...
        </p>
        
      </div>

      <div className="relative flex flex-col items-center before:absolute before:h-[300px] before:w-[900px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
         className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert rounded-full"
          src={ThoughtsLogo}
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <br></br>
        <input
            type="text"
            className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
            placeholder="Search for Artist"
            value={searchInput}
            onChange={(e) => search(e.target.value)}

        />
      </div>

      <Container className="mt-16">
        <Row className= "mx-2 row rows-cols-4">          
          <h1 style={{color: 'black'}} className="z-20 w-full max-w-5xl items-center justify-between font-mono text-5xl lg:flex">tracks</h1>
            {tracks.map((track, i) => (
              <Col md="3">
            
                <AlbumCard 
                  albumName={track.name ? track.name : ""}
                  artist={track.artists[0].name ? track.artists[0].name : ""}
                  score={0}  
                  image={track.album.images[0].url}     
                />
              </Col>

            ))}
            
            <br></br>
            <h1 style={{color: 'black'}} className="z-20 w-full max-w-5xl items-center justify-between font-mono text-5xl lg:flex">albums</h1>
            {albums.map((album, i) => (
              <Col md="3">
            
                <AlbumCard 
                  albumName={album.name ? album.name : ""}
                  artist={album.artists[0].name ? album.artists[0].name : ""}
                  score={0}  
                  image={album.images[0].url}     
                />
              </Col>
            
            ))}
           

          

        </Row>
  </Container>
    
      

      
    </main>
  )
}

export default page
