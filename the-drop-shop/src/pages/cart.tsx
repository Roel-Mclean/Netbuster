import { Divider, Footer, NavBar } from "@/components/componentsindex";
import Image from "next/image";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "@/context/cartcontext";
import { getBase64ImageUrl } from "@/util/imageutil";
import { useRouter } from "next/router";
import Head from "next/head";

const StyledCart = styled.div`
  text-align: center;
  height: 100vh;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
`;

const Header = styled.thead`
  border-bottom: 1px solid #000;
`;

const HeaderData = styled.th`
  font-size: 18px;
  font-weight: 500;
  padding: 10px;
  text-align: left;
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

const ProductImageContainer = styled.td`
  width: 120px;
  padding: 10px;
`;

const ProductImage = styled(Image)`
  object-fit: contain;
`;

export default function Cart() {
  const router = useRouter();

  const { items, addToCart, removeFromCart } = useContext(CartContext);

  const removeProduct = (id: string) => {
    if (removeFromCart) {
      removeFromCart(id);
    }
  };

  const redirectToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <StyledCart>
      <Head>
        <title>Cart</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar highlightedLink="Cart" />
      <h2>Cart</h2>
      <Divider />
      {items.length > 0 ? (
        <>
          <Table>
            <Header>
              <tr>
                <HeaderData></HeaderData>
                <HeaderData>Name</HeaderData>
                <HeaderData>Price</HeaderData>
                <HeaderData>Qty</HeaderData>
                <HeaderData></HeaderData>
              </tr>
            </Header>
            <tbody>
              {items.map((product, index) => (
                <tr key={index}>
                  <ProductImageContainer>
                    <ProductImage
                      src={getBase64ImageUrl(product.image.data.data)}
                      alt={product.title}
                      width={100}
                      height={50}
                    />
                  </ProductImageContainer>
                  <td>{product.title}</td>
                  <td>£{product.price}</td>
                  <td>1</td>
                  <td>
                    <button onClick={() => removeProduct(product.productId)}>
                      <FaTrashAlt color="red" title="Remove" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button onClick={redirectToCheckout}>Continue To Payment</Button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </StyledCart>
  );
}