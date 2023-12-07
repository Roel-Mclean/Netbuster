import { CallToAction } from "@/components/calltoaction/calltoaction";
import { Divider, Footer, NavBar, PageLink } from "@/components/componentsindex";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const AboutContainer = styled.div`
  flex: 1;

  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  flex: 1.5;
  padding: 10px;
  margin-top: 20px;

  @media (min-width: 1200px) {
    margin-top: 0;
    padding-left: 110px;
    padding-right: 40px;
    text-align: left;
  }
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  padding-left: 20px;
  width: 100%;
  height: 100%;

  @media (max-width: 1200px) {
    transform: rotate(0);
  }
`;

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div style={{ zIndex: 1, position: "relative" }}>
        <NavBar highlightedLink="About" />
      </div>
      <FlexContainer>
        <AboutContainer>
          <StyledImage
            src="/images/family_watching_movie.webp"
            alt="Collection of shoes"
            width={426}
            height={756}
          />
        </AboutContainer>
        <TextContainer>
          <h2>Who We Are</h2>
          <Divider />
          <p>
          Welcome to Netbuster — your digital doorway to a world of cinematic wonders. 
          As connoisseurs of film, we offer an eclectic DVD selection that spans the latest blockbusters to cherished classics. 
          At Netbuster, we're not just about movies; we're about the thrill of discovering your next favorite story. 
          Indulge in our handpicked collection, find rare editions and enjoy the convenience of having the magic of cinema delivered straight to your door. 
          Start your next movie adventure with Netbuster and transform your DVD collection into a personal hall of film fame. 
          Shop now and join the movie magic!
          </p>
          <CallToAction href="/shop" isTransparent>Shop Now</CallToAction>
        </TextContainer>
      </FlexContainer>
    </>
  );
}
