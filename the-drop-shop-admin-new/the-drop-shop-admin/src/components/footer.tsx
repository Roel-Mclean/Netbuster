import React from "react";
import styled from "styled-components"

const StyledFooter = styled.footer`
  width: 100%;
  height: 90px;
  line-height: 80px;
  background-color: #1F1F1F;
  position: absolute; // changed to absolute
  bottom: 0;
  left: 0; // ensure it's aligned left
  text-align: center;
  font-size: 32px;
  color: #FFF;
  margin-top: 0;
  z-index: 10; 

  @media (min-height: 100vh) {
    position: fixed; // fixed for screens with at least 100vh height
  }
`;

export const Footer = () => {
    return (
        <StyledFooter>Netbuster</StyledFooter>
    );
}