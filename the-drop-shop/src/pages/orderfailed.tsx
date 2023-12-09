import { CallToAction } from "@/components/calltoaction/calltoaction";
import { NavBar } from "@/components/componentsindex";
import Image from "next/image";
import styled from "styled-components";

export default function OrderFailed() {

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <>
      <NavBar highlightedLink="Cart" />
      <Container>
        <h2>Order Cancelled</h2>
        <Image
          src='/images/insideOut.gif'
          alt='Your order has been cancelled'
          width={500}
          height={400}
          style={{objectFit: 'contain'}}
        />
        <p>Please Try Again...We&apos;d hate to see you leave!</p>
        <CallToAction href="/shop" isTransparent>Shop Now</CallToAction>
      </Container>
    </>
  )
}