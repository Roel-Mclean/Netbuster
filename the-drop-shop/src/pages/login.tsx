import Head from "next/head";
import styled from "styled-components";
import { NavBar } from "@/components/componentsindex";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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
  background-color: #007bff;
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e: any) => {
    e.preventDefault()
    router.replace("/")
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <NavBar highlightedLink="Profile" />
      <PageContainer>
        <form onSubmit={(e) => signIn(e)}>
          <Section>
            <h2>Login</h2>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <Button type="submit">Login</Button>
        </form>
        <Account>
          Don't have an account? <StyledLink href="/signup">Sign Up</StyledLink>
        </Account>
      </PageContainer>
    </>
  );
}
