"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card,} from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC } from 'react'
import { CardHeaderProps } from 'react-bootstrap/esm/CardHeader'

interface SongCardProps {
    songName: string | "",
    artist: string | "",
    score: number, 
    image: string | ""


}
export default function SongCard(props: SongCardProps) {
    const { songName, artist, score, image } = props;
    console.log(songName)

    return (
       
            <Card style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
                <Card.Img src={image} style={{ maxWidth: '300px' }}></Card.Img>  
                <Card.Body>
                    <Card.Title className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                        {songName}</Card.Title>
                </Card.Body>  
            </Card> 

    )


}