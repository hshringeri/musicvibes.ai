"use client"
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap'
import ThoughtsLogo from './images/thoughts-logo3.jpeg'
import { useState, useEffect, FC } from 'react'
import { access } from 'fs'
import { getTrackReviews} from '../../../lib/helper.js'
import { useSearchParams } from 'next/navigation'

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET

interface pageProps {
    track_id: string
}

const Page: FC<pageProps> = ({}: pageProps) => {
    const [trackReviews, setTrackReviews] = useState<any[]>([]);
    const searchParams = useSearchParams()
    const id = searchParams?.get('track_id')
    console.log(id)

    useEffect(() => {
        const fetchTrackReviews = async () => {
            try {
                const data = {
                    id: id
                }
                const reviews = await getTrackReviews(id);
                setTrackReviews(reviews);
                console.log(reviews);
            } catch (error) {
                console.error('Failed to fetch track reviews:', error);
            }
        };

        fetchTrackReviews();
    }, [id]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* Your component content */}
        </main>
    );
};

export default Page;

