import { Divider, ImageShowcase, NavBar } from "@/components/componentsindex";
import { CartContext } from "@/context/cartcontext";
import { Product } from "@/types/product";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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

const Container = styled.div`
    @media (min-width: 769px) {
        padding-left: 15px;
    }

    @media (max-width: 768px) {
        width: 100%;
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
    const [addToCartButtonText, setAddToCartButtonText] = useState("Add To Cart");
    const { addToCart } = useContext(CartContext);
    const [videoWidth, setVideoWidth] = useState(640);
    const [videoHeight, setVideoHeight] = useState(390);

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width < 768) {
                setVideoWidth(width - 40); // Adjust the width based on screen size
                setVideoHeight((width - 40) * (390 / 640)); // Maintain aspect ratio
            } else {
                setVideoWidth(640);
                setVideoHeight(390);
            }
        }

        // Add event listener
        // window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        // return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isSoldOut = () => {
        if (product)
            return product?.stock < 1

        return true
    }

    useEffect(() => {
        //check if router fields have updated before fetching product
        if (!router.isReady) return;
        getProduct(productid as string);
    }, [router.isReady, productid])

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
                price: product.price,
                qty: 1
            });
            setAddToCartButtonText("Added To Cart!")
        }
    }

    const opts = { 
        height: videoHeight.toString(), 
        width: videoWidth.toString(), 
        playerVars: { 
          autoplay: 0, 
        }, 
      };

    return (
        <>
            <Head>
                <title>{product?.title}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar highlightedLink="Shop" />
            <FlexContainer>
                <ImageShowcase images={product ? product.images : []} />
                <Container>
                    <h2>{product?.title}</h2>
                    <p>£{product?.price}</p>
                    <div style={{textAlign: "center"}}>
                        <Button disabled={isSoldOut()} onClick={addProductToCart}>{isSoldOut() ? "Sold Out" : addToCartButtonText}</Button>
                    </div>
                    <p style={{fontWeight: 400}}>Free delivery on all orders.</p>
                    <Divider />
                    {
                        Array(product?.rating).fill(1).map((_, index) => (
                            <svg key={index} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="30px" width="30px" version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlSpace="preserve">
<polygon style={{fill: "#FF6243"}} points="104.571,208.963 96.791,148.379 414.22,148.379 367.524,512 143.487,512 114.079,283.003 "/>
<g>
	<polygon style={{opacity: 0.4, fill: "#891C00"}} points="216.722,512 190.923,148.379 130.644,148.379    177.34,512  "/>
	<polygon style={{opacity: 0.4, fill: "#891C00"}} points="340.882,512 387.577,148.379 414.22,148.379    367.524,512  "/>
	<polygon style={{opacity: 0.4, fill: "#891C00"}} points="327.298,148.379 301.501,512 259.055,512    259.055,148.379  "/>
</g>
<path style={{fill: "#FFE477"}} d="M113.497,149.284c0,0-16.196-8.882-6.269-21.42s17.241-5.747,19.853-22.465  c2.612-16.718,13.061-17.241,28.735-32.914l44.408-40.751c25.078,3.657,27.167,4.706,35.527-13.061  c8.359-17.767,26.237-27.167,47.339-8.359s4.906,35.527,18.489,36.571c13.584,1.045,24.033-15.673,41.273-5.224  s32.914,17.763,18.808,27.167c-14.106,9.404,2.09,21.943,14.629,19.853c12.539-2.09,6.269,34.482,19.331,33.959  c13.061-0.522,15.151,26.645,15.151,26.645H113.497z"/>
<path style={{fill: "#FFCD00"}} d="M174.71,134.172c-0.659,0-1.329-0.085-1.997-0.261c-4.166-1.102-6.667-5.338-5.591-9.512  c0.219-0.853,5.593-20.909,23.506-24.07c5.536-0.977,9.382-0.922,12.19-0.883c1.09,0.016,2.448,0.033,2.824-0.071  c-0.009,0,0.528-0.304,1.717-1.741c0.507-0.613,1.047-1.288,1.622-2.006c6.582-8.224,20.279-25.342,42.164-18.248  c6.932,2.244,11.868,5.212,15.835,7.596c7.129,4.284,10.079,6.059,20.472,2.082c4.042-1.548,8.573,0.475,10.12,4.518  c1.546,4.042-0.475,8.573-4.518,10.12c-17.52,6.706-25.972,1.627-34.147-3.286c-3.622-2.177-7.365-4.427-12.591-6.12  c-10.712-3.466-17.704,3.893-25.097,13.131c-0.632,0.79-1.226,1.532-1.785,2.206c-5.869,7.093-10.689,7.583-16.836,7.491  c-2.423-0.033-5.17-0.073-9.244,0.646c-7.945,1.402-11.034,12.484-11.064,12.596C181.341,131.854,178.169,134.172,174.71,134.172z"/>
<g style={{opacity: 0.14}}>
	<path style={{fill: "#CD2A00"}} d="M254.316,46.884c13.584,1.045,24.033-15.673,41.273-5.224c0.345,0.209,0.689,0.415,1.032,0.622   c-1.348-6.403,2.391-18.659-12.542-31.969c-19.09-17.015-35.541-10.942-44.693,3.525C255.005,31.164,241.588,45.905,254.316,46.884   z"/>
	<path style={{fill: "#CD2A00"}} d="M411.674,148.379c-0.497-4.679-3.419-26.206-15.063-25.74c-13.061,0.522-6.792-36.049-19.331-33.959   c-12.539,2.09-28.735-10.449-14.629-19.853c14.106-9.404-1.567-16.718-18.808-27.167c-16.463-9.978-26.736,4.807-39.457,5.251   c13.034,7.836,21.638,14.168,10.013,21.917c-14.106,9.404,2.09,21.943,14.629,19.853c12.539-2.09,6.269,34.482,19.331,33.959   c11.644-0.466,14.566,21.061,15.063,25.74h3.537L320.262,512h21.611h26.642l46.695-363.621L411.674,148.379L411.674,148.379z"/>
</g>
</svg>
                        )) 
                    }
                    <h3>Synopsis</h3>
                    <p>{product?.description}</p>
                    <YouTube videoId={product?.trailerURL} opts={opts} />
                </Container>
            </FlexContainer>
        </>
    );
}