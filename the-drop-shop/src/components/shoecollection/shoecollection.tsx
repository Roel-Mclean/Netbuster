import React from "react";
import styled from "styled-components";
import { ShoeCollectionInterface } from "./shoecollection.types";
import { ShoeTile } from "../componentsindex";

const StyledShoeCollection = styled.div`
  padding: 20px;
  align-items: center;
`;

const Collection = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  list-style-type: none;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ListItem = styled.li`
  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const ShoeCollection: React.FC<ShoeCollectionInterface> = (props) => {
  return (
    <StyledShoeCollection>
      <h2>{props.title}</h2>
      <Collection>
        {props.products?.map((shoe) => (
          <ListItem key={shoe.productId}>
            <ShoeTile shoe={shoe} />
          </ListItem>
        ))}
      </Collection>
    </StyledShoeCollection>
  );
};
