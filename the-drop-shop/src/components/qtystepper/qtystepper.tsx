import { CartContext } from "@/context/cartcontext";
import { useContext, useEffect, useState } from "react"
import { FaMinus, FaPlus } from "react-icons/fa"
import styled from "styled-components"

const Container = styled.div`
  display: flex; /* Enable flexbox */
  flex-direction: row; /* Align children horizontally */
  align-items: center; /* Center children vertically in the container */
  justify-content: center; /* Center the content horizontally */
  gap: 10px; /* Add some space between the children */
`;

interface QtyStepperInterface {
  productId: string
}

export const QtyStepper = (props: QtyStepperInterface) => {
  const { updateQty } = useContext(CartContext);
  const [qty, setQty] = useState(1)

  useEffect(() => {
    updateCart()
  }, [qty])

  const updateCart = () => {
    if (updateQty) {
      updateQty(props.productId, qty)
    }
  }

  return (
    <Container>
      <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}><FaMinus color="#C60D0D" /></button>
      <p>{qty}</p>
      <button onClick={() => setQty(qty + 1)}><FaPlus color="#C60D0D" /></button>
    </Container>
  )
}