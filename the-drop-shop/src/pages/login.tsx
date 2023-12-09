import Head from "next/head";
import styled from "styled-components";
import { NavBar } from "@/components/componentsindex";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "@/types/user";
import { UserContext } from "./_app";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  width: 100vw;
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

const Account = styled.p`
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Login() {
  const router = useRouter();
  const { setCurrentUser } = useContext(UserContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e: any) => {
    e.preventDefault()
    const userFetch = await fetch(`http://localhost:8080/api/v1/users/login?email=${email}&password=${password}`);
    const user = await userFetch.json() as User;
    if (setCurrentUser) {
      setCurrentUser(user)
    }
    router.replace("/")
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar highlightedLink="Profile" />
      <PageContainer>
        <form onSubmit={(e) => signIn(e)}>
          <Section>
            <h2 style={{textAlign: "center"}}><b>Login</b></h2>
            <label htmlFor="email"><b>Email</b></label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password"><b>Password</b></label>
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
