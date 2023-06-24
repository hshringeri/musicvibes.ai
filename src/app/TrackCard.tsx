"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card,} from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC, useRef } from 'react'
import { CardHeaderProps } from 'react-bootstrap/esm/CardHeader'
import { addTrackReview } from '../../lib/helper.js'
import Link from 'next/link'

interface TrackCardProps {
    id: string | "",
    name: string | "",
    artist: string | "",
    score: number, 
    image: string | ""


}
export default function TrackCard(props: TrackCardProps) {
    const { id, name, artist, score, image } = props;
    console.log(name)

    const [showPopup, setShowPopup] = useState(false);
    const [review, setReview] = useState("")

    const handleAlbumClick = () => {
        setShowPopup(true);   
      }
    
      // Function to handle closing the popup
    const handleClosePopup = async () => {
        setShowPopup(false);
        console.log(showPopup)
        const trackReview = {
            id: id,
            track: [name, artist, image],
            review: review, 
            score: 0     
        }

        console.log(trackReview)
      
        try {
            addTrackReview(trackReview)
        } catch (error) {
            console.error("Failed to add review:", error)
        }

    }

    const handleReview = (review: string) => {
        setReview(review)
    }

    useEffect(() => {
        console.log(showPopup); // Will reflect the updated value
      }, [showPopup]);

    const buttonStyle = {
        background: 'none',
        border: 'none',
        padding: '0',
        font: 'inherit',
        cursor: 'pointer',
    };

    const viewTrackReviews = (id: string) => {
        const data = {
            track_id: id,
            title: name,
            artist: artist,
            image: image
        }

        const queryParams = new URLSearchParams(data).toString()
        const url = `/trackReviews?${queryParams}`
        window.location.href = url;
    }

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
                                        value={review}
                                        onChange={(e) => {handleReview(e.target.value)}}
                                    />  
                                    <Button onClick={handleClosePopup} style={buttonStyle}>
                                        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                                            submit 
                                        </div>
                                    </Button>
                                    <br></br>
                                    <Button onClick={() => viewTrackReviews(id)} style={buttonStyle}>
                                        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                                            view reviews
                                        </div>
                                    </Button>
                                </div>
                                
                            )}
                    </Card.Body> 
                    
                </Card> 
            </Button>
        </div>

    )


}


