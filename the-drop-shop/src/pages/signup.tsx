import Head from "next/head";
import styled from "styled-components";
import { NavBar } from "@/components/componentsindex";
import { useContext, useState } from "react";
import { UserContext } from "./_app";
import { useRouter } from "next/router";
import { User } from "@/types/user";

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
  border: 1px solid #fff;
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
    background-color: #C60D0D;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // Center the button horizontally
  width: 100%; // Take up the full width of the parent container
  margin-top: 20px; // Optional: to add some space above the button
`;

export default function SignUp() {
  const { setCurrentUser } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e: any) => {
    e.preventDefault();
    const userFetch = await fetch("http://localhost:8080/api/v1/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: name,
        password: password
      }),
      headers: {
        "Content-type": "application/json"
      }
    })

    var user = await userFetch.json() as User

    console.log("user:", user)

    if (user && setCurrentUser) {
      setCurrentUser(user)
      router.push("/")
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar highlightedLink="Profile" />
      <PageContainer>
        <form onSubmit={signup}>
          <Section>
            <h2 style={{textAlign: "center"}}><b>Sign Up</b></h2>
            <label htmlFor="email"><b>Email</b></label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="name"><b>Name</b></label>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <Button type="submit">Sign Up</Button>
          </ButtonContainer>
        </form>
      </PageContainer>
    </>
  );
}