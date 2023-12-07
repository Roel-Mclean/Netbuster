import { Footer, NavBar, ShoeCollection } from "@/components/componentsindex";
import Head from "next/head";
import shoes from '../shoecollection.json'
import { Product } from "@/types/product";
import { useEffect, useState } from "react";

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/v1/products");
            const data = await res.json() as Product[];
            setProducts(data);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Head>
                <title>Shop</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar highlightedLink="Shop"/>
            <ShoeCollection title="Products" products={products} />
        </>
    );
}