"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card,} from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC, useRef } from 'react'
import { CardHeaderProps } from 'react-bootstrap/esm/CardHeader'

interface TrackCardProps {
    name: string | "",
    artist: string | "",
    score: number, 
    image: string | ""


}
export default function TrackCard(props: TrackCardProps) {
    const { name, artist, score, image } = props;
    console.log(name)

    const [showPopup, setShowPopup] = useState(false);

    const handleAlbumClick = () => {
        setShowPopup(true);
        

        
      }
    
      // Function to handle closing the popup
      const handleClosePopup = () => {
        setShowPopup(false);
      }
      {console.log(showPopup)}

    return (
        <div>
        <Button onClick={handleAlbumClick} style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
                <Card style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
                    <Card.Img src={image} style={{ maxWidth: '300px' }}></Card.Img>  
                    <Card.Body>
                        <Card.Title className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                            {name}</Card.Title>
                            {showPopup && (
                                <div className="popup">
                                    <input
                                        type="text"
                                        className="px-12 py-3 w-full sm:px-8 sm:py-5 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
                                        placeholder="Give your thoughts"
                                        onBlur={handleClosePopup}
                                    />  
                                </div>
                                
                            )}
                    </Card.Body>   
                </Card> 
            </Button>
        </div>

    )


}


