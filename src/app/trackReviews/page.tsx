"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC } from 'react'
import { access } from 'fs'
import { getTrackReviews } from '../../../lib/helpers/trackReview'
import { getTrack } from '../../../lib/helpers/track'
import { useSearchParams } from 'next/navigation'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET

interface pageProps {
    track_id: string
    image: string
}

const Page: FC<pageProps> = ({}: pageProps) => {
    const [trackReviews, setTrackReviews] = useState<any[]>([]);
    const [trackScore, setTrackScore] = useState<String>("")
    const [trackAiReview, setTrackAiReview] = useState<String>("")

    const searchParams = useSearchParams()
    const id = searchParams?.get('track_id')
    const image = searchParams?.get('image')
    const title = searchParams?.get('title')
    const artist= searchParams?.get('artist')
    console.log(id)

    useEffect(() => {
        const fetchTrackReviews = async () => {
            try {
                console.log("hi")
                const reviews = await getTrackReviews(id);
                console.log("hi")
                setTrackReviews(reviews);
                console.log(reviews);
            } catch (error) {
                console.error('Failed to fetch track reviews:', error);
            }
        };

        const fetchTrack = async () => {
            try {
                const track = await getTrack(id);
                console.log(track)

                setTrackScore(track.score);
                console.log(trackScore);

                setTrackAiReview(track.ai_review)
                console.log(trackAiReview)

            } catch (error) {
                console.error('Failed to fetch track reviews:', error);
            }
        };

        fetchTrackReviews();
        fetchTrack()
        }, [id]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <Card.Img src={image ? image: ''} style={{ maxWidth: '300px' }}></Card.Img> 
                    
                </p>
                
                <h1 style={{ marginLeft: '30px', marginRight: '30px' }} >{title}</h1>

                <h2>{artist}</h2> 
            
            </div>
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <h3>{trackAiReview}</h3>
            </div>

        <Container className="mt-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h1 style={{ marginBottom: '30px'}}>reviews</h1>
            <h1 style={{ marginBottom: '30px', marginLeft: '850px'}}>{trackScore}</h1>
        </div>
            <Row>
            {trackReviews.map((review) => (
                <div key={review.id} className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    {review.review}
                    </p>
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    rating: {review.score}
                    </p>
                </div>
                ))}

            </Row>
      </Container>
 


        </main>
    );
};

export default Page;

