"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC } from 'react'
import { access } from 'fs'
import { getAlbumReviews } from '../../../lib/helpers/albumReview'
import { getAlbum } from '../../../lib/helpers/album'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET


const Page: FC = () => {
    
    const [albumReviews, setAlbumReviews] = useState<any[]>([]);
    const [albumScore, setAlbumScore] = useState<String>("")
    const [albumAiReview, setAlbumAiReview] = useState<String>("")

    const searchParams = useSearchParams()
    const id = searchParams?.get('album_id')
    const image = searchParams?.get('image')
    const title = searchParams?.get('title')
    const artist= searchParams?.get('artist')
    console.log(id)
    console.log(albumScore)
    console.log(title)

    useEffect(() => {
        const fetchAlbumReviews = async () => {
            try {
                const reviews = await getAlbumReviews(id);
                console.log(reviews)
                setAlbumReviews(reviews);
                console.log(albumReviews)
            } catch (error) {
                console.error('Failed to fetch track reviews:', error);
            }
        };

        const fetchAlbum = async () => {
            try {
                const album = await getAlbum(id);
                console.log(album)
                console.log(album)
                setAlbumScore(album.score);
                setAlbumAiReview(album.ai_review)
            } catch (error) {
                console.error('Failed to fetch track reviews:', error);
            }
        };

        fetchAlbumReviews();
        fetchAlbum()
        }, [id]);

        const roundedAlbumScore = Math.ceil(Number(albumScore))

    return (
        <main className=" bg-white flex min-h-screen flex-col items-center justify-between p-24">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <Card.Img src={image ? image : ''} style={{ maxWidth: '200px', margin: '0 2rem', borderRadius: '8px' }}></Card.Img>     
                    <h1 style={{ marginLeft: '150px', marginRight: '270px' }}>{title}</h1>
                    <h2>{artist}</h2> 
                </div>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ fontStyle: 'italic' }}>{albumAiReview}</h3>
                <br></br>
                <h1 style={{ marginBottom: '30px', border: Number(roundedAlbumScore) > 75 ? '2px solid green' : '2px solid black', borderRadius: '50%', padding: '20px', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{roundedAlbumScore}</h1>
            </div>

        <Container className="mt-8">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h1 style={{ marginBottom: '30px'}}>reviews</h1>
            
        </div>
            <Row>
            {albumReviews.map((review) => (
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
