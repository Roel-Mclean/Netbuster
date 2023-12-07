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
`;

const Section = styled.fieldset`
  background-color: #f5f5f5;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
`;

const Input = styled.input`
  border: 2px solid #ddd;
  border-radius: 5px;
  height: 40px;
  width: 95%;
  font-size: 16px;
  padding: 0 10px;
  margin: 10px 0;
`;

const Button = styled.button`
  background-color: #28a745;
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
    background-color: #218838;
  }
`;

const Account = styled.p`
  margin-top: 20px;
`;

const StyledLink = styled.a`
  color: #28a745;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function SignUp() {
  const { setCurrentUser } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e: any) => {
    e.preventDefault();
    const userFetch = await fetch("http://localhost:8080/api/v1/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      }),
      headers: {
        "Content-type": "application/json"
      }
    })

    console.log("userFetch:", userFetch)

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
      </Head>
      <NavBar highlightedLink="Profile" />
      <PageContainer>
        <form onSubmit={signup}>
          <Section>
            <h2>Sign Up</h2>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Section>
          <Button type="submit">Sign Up</Button>
        </form>
        <Account>
          Already have an account? <StyledLink href="/login">Login</StyledLink>
        </Account>
      </PageContainer>
    </>
  );
}