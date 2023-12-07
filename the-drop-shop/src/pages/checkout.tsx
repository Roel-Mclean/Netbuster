import Image from "next/image";
import { Divider, Footer, NavBar } from "@/components/componentsindex";
import { CartContext } from "@/context/cartcontext";
import { getBase64ImageUrl } from "@/util/imageutil";
import { useContext, useState } from "react";
import styled from "styled-components"
import { Order } from "@/types/order";
import { useRouter } from "next/router";
import Head from "next/head";

const StyledCheckout = styled.div`
  text-align: center;
`;

const Button = styled.button`
  border-radius: 8px;
  background-color: #1F1F1F;
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

const Section = styled.fieldset`
  background-color: #D9D9D9;
  border: none;
  text-align: left;
  margin: 35px;
`;

const Input = styled.input`
  border: none;
  height: 50px;
  width: 100%;
  font-size: 24px
`;

const Legend = styled.legend`
  float: left;
  font-size: 28px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
  padding: 35px;
`;

const OrderSummary = styled.div`
  margin-top: 50px;
  text-align: center;
`;

const OrderItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductImage = styled(Image)`
  object-fit: contain;
`;

export default function Checkout() {
  const { items, addToCart, removeFromCart } = useContext(CartContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const getTotal = (): number => {
    if (items && items.length > 0) {
      const prices = items.map(item => item.price)
      return prices.reduce((total, num) => total + num);
    }
    return 0;
  };

  const submitPurchase = async (e: any) => {
    e.preventDefault();
    const request = {
      "products": items.map(item => { return {
        "productId": item.productId,
    }}),
      "customer": {
        "email":  email,
        "phone": phone,
        "fname": fname,
        "sname": sname,
        "address1": address1,
        "address2": address2,
        "postcode": postcode,
        "city": city
      },
      "cardNumber": cardNumber,
      "expiry": expiry,
      "cvv": cvv
    }

    const data = await fetch("http://localhost:8080/api/v1/order/submit", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-type": "application/json"
      }
    });

    if (data.status === 200) {
      const order = await data.json() as Order;
      router.replace(`/order/${order.orderId}`);
    }
  }

  return (
    <StyledCheckout>
      <Head>
        <title>Checkout</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar highlightedLink="Cart" />
      <h2>Payment</h2>
      <Divider />
      <FlexContainer>
        <form onSubmit={(e) => submitPurchase(e)} method="post">
          <Section>
            <Legend>Contact Information</Legend>
            <br />
            <label htmlFor="email">Email</label><br/>
            <Input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
            <label htmlFor="phone">Phone</label><br />
            <Input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br/>
          </Section>

          <Section>
            <Legend>Delivery Details </Legend>
            <small>*Delivery address must match billing address</small>
            <br />
            <label htmlFor="fname">Firstname</label><br />
            <Input type="text" id="fname" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} /><br/>
            <label htmlFor="sname">Surname</label><br />
            <Input type="text" id="sname" name="sname" value={sname} onChange={(e) => setSname(e.target.value)} /><br/>
            <label htmlFor="address1">Address Line 1</label><br />
            <Input type="text" id="address1" name="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} /><br/>
            <label htmlFor="address2">Address Line 2</label><br />
            <Input type="text" id="address2" name="address2" value={address2} onChange={(e) => setAddress2(e.target.value)} /><br/>
            <label htmlFor="postcode">Postcode</label><br />
            <Input type="text" id="postcode" name="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} /><br/>
            <label htmlFor="city">City</label><br />
            <Input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} /><br/>
          </Section>

          <Section>
            <Legend>Payment Information</Legend>
            <br />
            <label htmlFor="cardnumber">Card Number</label><br />
            <Input type="text" id="cardnumber" name="cardnumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} /><br/>
            <label htmlFor="expiry">Expiry Date</label><br />
            <Input type="text" id="expiry" name="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} /><br/>
            <label htmlFor="cvv">Security Code</label><br />
            <Input type="text" id="cvv" name="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} /><br/>
          </Section>

          <Button type="submit">Purchase</Button>
        </form>

        <div>
          <div style={{ textAlign: "center" }}>
            <h3>Your Order</h3>
          </div>

          <OrderSummary>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {items.map((item, index) => (
                <OrderItem key={index}>
                  <div style={{ marginRight: "20px" }}>
                    <ProductImage
                      src={getBase64ImageUrl(item.image.data.data)}
                      alt={item.title}
                      height={100}
                      width={100}
                    />
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p>Price - £{item.price}</p>
                  </div>
                </OrderItem>
              ))}
            </ul>
            <Divider />
            <p>Subtotal - £{getTotal()}</p>
            <p style={{ fontWeight: "bold" }}>Total - £{getTotal()}</p>
          </OrderSummary>
        </div>
      </FlexContainer>
    </StyledCheckout>
  )
}
