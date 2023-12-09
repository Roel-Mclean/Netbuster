import { Divider, NavBar } from "@/components/componentsindex";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./_app";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

const StyledProfile = styled.div`
  text-align: center;
  height: 100vh;
`;

const Title = styled.h2`
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    background-image: url('/images/camera.png');
    background-size: contain;  // Adjust the size as needed
    background-repeat: no-repeat;
    width: 80px;   // Set the width of the image
    height: 80px;  // Set the height of the image
    vertical-align: -37px;
    margin-right: 1rem; // Adjusted from padding-right for better control
  }
`;


const Table = styled.table`
  width: 60%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.thead`
  border-bottom: 1px solid #000;
`;

const HeaderData = styled.th`
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  border-bottom: 1px solid #000; // Apply bottom border to table cells
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #000; // Apply bottom border to table cells
`;

const Button = styled.button`
  border-radius: 8px;
  background-color: #1f1f1f;
  border: 1px solid;
  max-width: 445px;
  width: 100%;
  height: 70px;
  color: white;
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 20px;

  &:hover {
    cursor: pointer;
  }
`;

export default function Profile() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [ items, setItems ] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([]);
    items.forEach(item => {
      setProducts((prevProducts) => [...prevProducts, ...item.products])
    })
  }, [items])

  useEffect(() => {
    fetchOrders();
  }, [currentUser])


  const fetchOrders = async () => {
    const ordersFetch = await fetch(`http://localhost:8080/api/v1/order/findByEmail?email=${currentUser?.email}`);
    const orders = await ordersFetch.json() as Order[]
    console.log(orders)
    setItems(orders);
  }

  const signOut = () => {
    if (setCurrentUser) {
      setCurrentUser(null);
      router.push("/")
    }
  }

  return (
    <StyledProfile>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar highlightedLink="Cart" />
      <Title>Hello, {currentUser?.username}</Title>
      <Divider />
      <p>Order History</p>
      {items.length > 0 ? (
        <>
          <Table>
            <Header>
              <tr>
                <HeaderData>Name</HeaderData>
                <HeaderData>Price</HeaderData>
                <HeaderData>Qty</HeaderData>
              </tr>
            </Header>
            <tbody>
              {products.map((product, index) => (
                  <tr key={index}>
                  <TableData>{product.title}</TableData>
                  <TableData>£{product.price * product.qty}</TableData>
                  <TableData>{product.qty}</TableData>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button onClick={signOut}>Sign out</Button>
        </>
      ) : (
        <p>You have placed no previous orders.</p>
      )}
    </StyledProfile>
  )
}