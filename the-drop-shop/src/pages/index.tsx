import Head from 'next/head'
import { Divider, HeroSection, PageLink, ShoeCollection } from '@/components/componentsindex'
import shoes from '../shoecollection.json'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { CallToAction } from '@/components/calltoaction/calltoaction'

const SlideDirection = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;

    @media (max-width: 768px) {
        display: none;
    }
`

const Left = styled.div`
    background-color: #C60D0D;
    opacity: 0.6;
    color: #fff;
    padding: 10px 10px 10px 13px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute; /* Add absolute positioning */
    top: 0; /* Vertically center the indicator */
    transform: translateY(-600%);
    left: 10px; /* Adjust the left position as needed */
`

const Right = styled.div`
    background-color: #C60D0D;
    opacity: 0.6;
    color: #fff;
    padding: 10px 10px 10px 13px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute; /* Add absolute positioning */
    top: 50%; /* Vertically center the indicator */
    transform: translateY(-600%);
    right: 10px; /* Adjust the right position as needed */
`

export default function Home() {

    const [latestProducts, setLatestProducts] = useState<Product[]>([]);
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        getLatestProducts();
    }, [])

    useEffect(() => {
        setDisplayedProducts(latestProducts.slice(currentIndex, currentIndex + 4));
    }, [currentIndex, latestProducts]);

    const getLatestProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/v1/products/latest?num=8");
            const data = await res.json() as Product[];
            setLatestProducts(data);
            setDisplayedProducts(data.slice(currentIndex, 4));
        } catch (err) {
            console.log(err);
        }
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 < latestProducts.length - 3 ? prevIndex + 1 : 0
        );
    };
    
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 >= 0 ? prevIndex - 1 : latestProducts.length - 4
        );
    };

    return (
        <>
            <Head>
                <title>Netbuster</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <HeroSection />
            <ShoeCollection title='Latest Releases' products={displayedProducts} />
            <SlideDirection>
                <Left onClick={handlePrevious}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                >
                    <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                </svg>
                </Left>
                <Right onClick={handleNext}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                >
                    <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                </svg>
                </Right>
            </SlideDirection>
            <Divider />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CallToAction href='/shop' isTransparent>Shop More</CallToAction>
            </div>
            
        </>
    )
}
