import React, { useContext, useDeferredValue, useEffect, useState } from "react";
import styled from "styled-components";
import { NavBarInterface } from "./navbar.types";
import { PageLink } from "../componentsindex";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/images/logo.png"
import { UserContext } from "@/pages/_app";
import Link from "next/link";

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
    margin: 0 40px;
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
    color: #fff;
    cursor: pointer;

    @media (min-width: 769px) {
        display: none;
    }
`;

const MobileMenuDropdown = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    background-color: #1f1f1f;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 10px;
    width: 100%;

    a {
        display: block;
        color: #fff;
        font-size: 18px;
        margin-bottom: 5px;
        text-decoration: none;
    }
`;

const CloseIcon = styled(FaTimes)`
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button<{isOpen: boolean}>`
  color: ${(props) => (props.isOpen ? "#C60D0D" : "#FFF")};
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
`;

const DropdownContent = styled.div<{isOpen: boolean}>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: -150%;
  background-color: #1F1F1F;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100px;

  button {
    width: 100%;
    padding: 10px;
    border: none;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: #ddd;
    }
  }
`;

const ProfileLink = styled.a`
  display: block;
    text-decoration: none;
    color: #FFF;
    font-size: 16px;
    position: relative;
    transition: color 0.3s ease;
    font-weight: normal;

    &:hover::before, &:hover {
        transform: scaleX(1);
        color: #C60D0D;
        transition: transform 0.3s ease;
    }
`;

const Button = styled.button`
  display: block;
  text-decoration: none;
  color: #C60D0D;
  font-size: 16px;
  position: relative;
  transition: color 0.3s ease;
  font-weight: normal;

  &:hover::before, &:hover {
      background-color: transparent;
      transform: scaleX(1);
      color: #FFF;
      transition: transform 0.3s ease;
  }
`;

export const NavBar: React.FC<NavBarInterface> = (props: NavBarInterface) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const signOut = () => {
    if (setCurrentUser)
      setCurrentUser(null);
  }

  return (
    <StyledNavBar isTransparent={props.isTransparent}>
      <Link style={{margin: "50px"}} href="/" >
        <Image 
          src={logo}
          alt="Netbuster"
          style={{objectFit: 'contain'}}
          width={200}
          height={150}
        />
      </Link>

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
          <DropdownContainer>
            <DropdownButton isOpen={isDropdownOpen} onClick={toggleDropdown}><FaUser /></DropdownButton>
            <DropdownContent isOpen={isDropdownOpen}>
              {!currentUser ? (
                <>
                  <Link href="/login" passHref legacyBehavior style={{textDecoration: "none"}} >
                    <ProfileLink href="/login">Login</ProfileLink>
                  </Link>
                  <Link href="/signup" passHref legacyBehavior style={{textDecoration: "none"}} >
                    <ProfileLink href="/signup">Sign Up</ProfileLink>
                  </Link>
                </>
              ) : (
                <>
                <Link href="/profile" passHref legacyBehavior style={{textDecoration: "none"}} >
                  <ProfileLink href="/profile">Profile</ProfileLink>
                </Link>
                  <Button onClick={signOut}>Sign Out</Button>
                </>
              )
              }
            </DropdownContent>
          </DropdownContainer>
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
