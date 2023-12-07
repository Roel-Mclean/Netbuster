import Head from 'next/head'
import { Divider, HeroSection, PageLink, ShoeCollection } from '@/components/componentsindex'
import shoes from '../shoecollection.json'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { CallToAction } from '@/components/calltoaction/calltoaction'

export default function Home() {

    const [latestProducts, setLatestProducts] = useState<Product[]>([]);

    useEffect(() => {
        getLatestProducts();
    }, [])

    const getLatestProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/v1/products/latest?num=4");
            const data = await res.json() as Product[];
            setLatestProducts(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Head>
                <title>The Drop Shop</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <HeroSection />
            <ShoeCollection title='Latest Drops' products={latestProducts} />
            <Divider />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <CallToAction href='/shop' isTransparent>Shop More</CallToAction>
            </div>
            
        </>
    )
}
