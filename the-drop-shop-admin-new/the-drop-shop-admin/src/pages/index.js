import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({subsets : ['latin']});

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: ${montserrat.style.fontFamily}, sans-serif;

  width: calc(100vw - 40px);
    height: 100vh;
    position: relative;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/movie_catalogue.jpeg");
    background-size: 200%;

  animation: pan-image 60s linear infinite;
  animation-direction: alternate;

  @keyframes pan-image {
    from {
      background-position: 0% 0%;
    }

    to {
      background-position: 100% 100%;
    }
  }
`;

const Section = styled.fieldset`
  background-color: #FFF;
  border-radius: 10px;
  border: 1px solid #FFF;
  padding: 20px;
  width: 100%;
  margin: 20px 0;

  @media (max-width: 768px) {
    max-width: 350px;
}
`;

const Input = styled.input`
  border: 1px solid #EDEFF2;
  background-color: #EDEFF2;
  border-radius: 5px;
  height: 40px;
  width: 95%;
  font-size: 16px;
  padding: 0 10px;
  margin: 10px 0;
  color: #1F1F1F;
`;

const Button = styled.button`
  background-color: #C60D0D;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Center the button horizontally
  width: 100%; // Take up the full width of the parent container
  margin-top: 20px; // Optional: to add some space above the button
`;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn =  (e) => {
    e.preventDefault()
    if(email === "admin@gmail.com" && password === "password") {
    router.push("/admin")
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PageContainer>
        <form onSubmit={(e) => signIn(e)}>
          <Section>
            <h2 style={{textAlign: "center", color: "black"}}><b>Admin Login</b></h2>
            <label htmlFor="email" style={{color: "black"}}><b>Email</b></label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" style={{color: "black"}}><b>Password</b></label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Section>
          <ButtonContainer>
            <Button type="submit">Login</Button>
          </ButtonContainer>
        </form>
      </PageContainer>
    </>
  );
}