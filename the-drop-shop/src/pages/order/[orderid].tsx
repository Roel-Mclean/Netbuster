import { CallToAction } from "@/components/calltoaction/calltoaction";
import { Footer, NavBar, PageLink } from "@/components/componentsindex";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../_app";

const StyledConfirmOrder = styled.div`
    text-align: center;
`;

export default function ConfirmOrder() {
    const router = useRouter();
    const { currentUser } = useContext(UserContext);
    const { productid } = router.query;

    return (
        <StyledConfirmOrder>
            <Head>
                <title>Order</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <NavBar highlightedLink="Cart"/>
            <h2>{`Thank you for your order ${currentUser ? currentUser.username : ""}!`}</h2>
            <Image
                src='/images/popcorn.jpg'
                alt='Thank you for your order'
                width={300}
                height={350}
                style={{objectFit: 'contain'}}
            />
            <p>Your item will be dispatched shortly</p>
            <CallToAction isTransparent={false} href="/shop">Shop Now</CallToAction>
        </StyledConfirmOrder>
    );
}