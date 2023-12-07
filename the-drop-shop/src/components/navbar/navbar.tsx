import React, { useState } from "react";
import styled from "styled-components";
import { NavBarInterface } from "./navbar.types";
import { PageLink } from "../componentsindex";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/images/logo.png"

const StyledNavBar = styled.div<{isTransparent?: boolean}>`
    position: relative;     
    z-index: 1; 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 110px;
    background-color: ${({isTransparent}) => isTransparent ? "rgba(0, 0, 0, 0.7)" : "rgba(31, 31, 31, 1)"};
    color: #003399;
    width: 100vw;
`;

const List = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    color: #003399;
    font-size: 22px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Item = styled.li`
    margin-right: 20px;

    &:last-child {
        margin-right: 0;
    }
`;

const MobileMenuIcon = styled(FaBars)`
    font-size: 24px;
    color: #003399;
    cursor: pointer;

    @media (min-width: 769px) {
        display: none;
    }
`;

const MobileMenuDropdown = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    background-color: #003399;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 10px;
    width: 100%;

    a {
        display: block;
        color: #003399;
        font-size: 18px;
        margin-bottom: 5px;
        text-decoration: none;
    }
`;

const CloseIcon = styled(FaTimes)`
    font-size: 24px;
    color: #003399;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
`;

export const NavBar: React.FC<NavBarInterface> = (props: NavBarInterface) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <StyledNavBar isTransparent={props.isTransparent}>
      <PageLink href="/" isLarge isHighlighted={false} >
        <Image 
          src={logo}
          alt="Netbuster"
          style={{objectFit: 'contain'}}
          width={200}
          height={150}
        />
      </PageLink>

      <List>
        <Item>
          <PageLink isHighlighted={props.highlightedLink === "Home"} href="/">Home</PageLink>
        </Item>
        <Item>
          <PageLink isHighlighted={props.highlightedLink === "Shop"} href="/shop">Shop</PageLink>
        </Item>
        <Item>
          <PageLink isHighlighted={props.highlightedLink === "About"} href="/about">About</PageLink>
        </Item>
        <Item>
          <PageLink isHighlighted={props.highlightedLink === "Cart"} href="/cart"><FaShoppingCart /></PageLink>
        </Item>
        <Item>
          <PageLink isHighlighted={props.highlightedLink === "Profile"} href="/login"><FaUser /></PageLink>
        </Item>
      </List>

      <MobileMenuIcon onClick={toggleMobileMenu} />

      {isMobileMenuOpen && (
        <MobileMenuDropdown isOpen={isMobileMenuOpen}>
          <CloseIcon onClick={toggleMobileMenu} />
          <PageLink isHighlighted={props.highlightedLink === "Home"} href="/">Home</PageLink>
          <PageLink isHighlighted={props.highlightedLink === "Shop"} href="/shop">Shop</PageLink>
          <PageLink isHighlighted={props.highlightedLink === "About"} href="/about">About</PageLink>
          <PageLink isHighlighted={props.highlightedLink === "Cart"} href="/cart"><FaShoppingCart /></PageLink>
          <PageLink isHighlighted={props.highlightedLink === "Profile"} href="/"><FaUser /></PageLink>
        </MobileMenuDropdown>
      )}
    </StyledNavBar>
  );
};
