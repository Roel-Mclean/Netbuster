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
                <link rel="icon" href="/favicon.webp" />
            </Head>
            <NavBar highlightedLink="Cart"/>
            <h2>{`Thank you for your order ${currentUser ? currentUser.username : ""}!`}</h2>
            <Image
                src='/images/confirm_order_image.jpg.webp'
                alt='Thank you for your order'
                width={425}
                height={300}
                style={{objectFit: 'contain'}}
            />
            <p>Your item will be dispatched shortly</p>
            <CallToAction href="/shop" isTransparent>Shop Now</CallToAction>
        </StyledConfirmOrder>
    );
}