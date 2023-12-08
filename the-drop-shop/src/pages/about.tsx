import { CallToAction } from "@/components/calltoaction/calltoaction";
import { Divider, NavBar } from "@/components/componentsindex";
import Head from "next/head";
import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  background: url('/images/Picture1.jpg') no-repeat center center fixed;
  background-size: cover;
  position: relative;
  color: #FFF;
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 10px;
  margin-top: 20px;
  text-align: center; // Ensure text is always centered

  @media (min-width: 1200px) {
    margin-top: 0;
    padding-left: 300px;
    padding-right: 300px;
    // Remove text-align: left; to keep the text centered
  }
`;

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <FlexContainer>
        <NavBar highlightedLink="About" isTransparent/>
        <TextContainer>
          <h2>Who We Are</h2>
          <Divider />
          <p style={{fontSize: "20px"}}>
            Welcome to Netbuster — your digital doorway to a world of cinematic wonders. As connoisseurs of film, we offer an eclectic DVD selection that spans the latest blockbusters to cherished classics. At Netbuster, we&apos;re not just about movies; we&apos;re about the thrill of discovering your next favorite story. Indulge in our handpicked collection, find rare editions and enjoy the convenience of having the magic of cinema delivered straight to your door. Start your next movie adventure with Netbuster and transform your DVD collection into a personal hall of film fame. Shop now and join the movie magic!
          </p>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <CallToAction href='/shop'>Shop More</CallToAction>
          </div>
        </TextContainer>
      </FlexContainer>
    </>
  );
}
