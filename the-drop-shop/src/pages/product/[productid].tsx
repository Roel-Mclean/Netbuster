import { Divider, Footer, ImageShowcase, NavBar, SizeGrid } from "@/components/componentsindex";
import { CartContext } from "@/context/cartcontext";
import { Product, Size } from "@/types/product";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { FaStar } from "react-icons/fa";
import YouTube from "react-youtube";
import styled from "styled-components";

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: start;
    padding: 35px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Button = styled.button`
    border-radius: 35px;
    border: 2px solid #D9D9D9;
    background-color: #FFF;
    height: 70px;
    width: 375px;
    font-size: 22px;
    font-weight: 300;

    &:hover {
        cursor: pointer;
        border-color: #1F1F1F;
    }
`;

export default function Product() {
    const router = useRouter();
    const { productid } = router.query;
    const [product, setProduct] = useState<Product>();
    const [selectedSize, setSelectedSize] = useState<Size>();
    const [addToCartButtonText, setAddToCartButtonText] = useState("Add To Cart");
    const { items, addToCart, removeFromCart } = useContext(CartContext);
    const [stars, setStars] = useState<IconType[]>([]);

    useEffect(() => {
        //check if router fields have updated before fetching product
        if (!router.isReady) return;
        getProduct(productid as string);
    }, [router.isReady])

    const getProduct = async (productId: string) => {
        
        try {
            const res = await fetch(`http://localhost:8080/api/v1/products/${productId}`);
            const data = await res.json() as Product;
            setProduct(data);
        } catch (err) {
            console.log(err);
        }
    }

    const addProductToCart = () => {
        if (addToCart && product) {
            addToCart({
                productId: product.productId, 
                image: product.images[0],
                title: product.title, 
                price: product.price
            });
            setAddToCartButtonText("Added To Cart!")
        }
    }

    const opts = { 
        height: "390", 
        width: "640", 
        playerVars: { 
          autoplay: 0, 
        }, 
      };

    return (
        <>
            <Head>
                <title>{product?.title}</title>
                <link rel="icon" href="/favicon.webp" />
            </Head>
            <NavBar highlightedLink="Shop" />
            <FlexContainer>
                <ImageShowcase images={product ? product.images : []} />
                <div style={{paddingLeft: 15}}>
                    <h2>{product?.title}</h2>
                    <p>£{product?.price}</p>
                    <div style={{textAlign: "center"}}>
                        <Button onClick={addProductToCart}>{addToCartButtonText}</Button>
                    </div>
                    <p style={{fontWeight: 400}}>Free delivery on all orders.</p>
                    <Divider />
                    {
                        Array(product?.rating).fill(1).map(() => (
                            <FaStar color="#C60D0D"/>
                        )) 
                    }
                    <h3>Synopsis</h3>
                    <p>{product?.description}</p>
                    <YouTube videoId={product?.trailerURL} opts={opts} />
                </div>
            </FlexContainer>
        </>
    );
}