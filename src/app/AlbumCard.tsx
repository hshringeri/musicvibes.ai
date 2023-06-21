"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card,} from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC, useRef } from 'react'
import { CardHeaderProps } from 'react-bootstrap/esm/CardHeader'

interface AlbumCardProps {
    albumName: string | "",
    artist: string | "",
    score: number, 
    image: string | ""


}
export default function AlbumCard(props: AlbumCardProps) {
    const { albumName, artist, score, image } = props;
    console.log(albumName)

    const [showPopup, setShowPopup] = useState(false);
    const [clickCount, setClickCount] = useState(0)


    



    const handleAlbumClick = () => {
        console.log(clickCount)

        if (clickCount == 0) {
            setShowPopup(true);
        }

        setClickCount(clickCount + 1);

        if (clickCount == 1) {
            handleClosePopup()
        }
      }
    
      // Function to handle closing the popup
      const handleClosePopup = () => {
        console.log("hi")
        setShowPopup(false);
        setClickCount(0)
      }
      {console.log(showPopup)}

    return (

       <Button onClick={handleAlbumClick} style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
            <Card style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
                <Card.Img src={image} style={{ maxWidth: '300px' }}></Card.Img>  
                <Card.Body>
                    <Card.Title className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                        {albumName}</Card.Title>
                        {showPopup && (
                            <div className="popup">
                                <input
                                    type="text"
                                    className="px-10 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
                                    placeholder="Give your thoughts"
                                />
                                <Button onClick={handleClosePopup}>Close</Button>   
                            </div>
                            
                        )}
                </Card.Body>   
            </Card> 
        </Button>

    )


}


