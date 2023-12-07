import { PageLinkInterface } from "./pagelink.types";
import styled from "styled-components";
import Link from "next/link";


const StyledLink = styled.a`
    margin: 25px;
    text-decoration: none;
    color: #C60D0D;
    font-size: 22px;
    position: relative;
    transition: color 0.3s ease;
    font-weight: bold;

    &::before {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 2px;
        border-radius: 100%;
        bottom: -3px;
        left: 0;
        background-color: #FFF;
        transform: scaleX(0);
        transition: transform 0.3s ease;
    }

    &:hover::before, &:hover {
        transform: scaleX(1);
        color: #FFF;
    }

    @media (max-width: 768px) {
        font-size: 16px;
    } 
`;

const LargeLink = styled(StyledLink)`
    font-size: 32px;
    margin: 50px;

    @media (max-width: 768px) {
        font-size: 22px;
    } 
`;

export const PageLink = (props: PageLinkInterface) => {
    if (props.isLarge) {
        return (
            <Link href={props.href} passHref legacyBehavior style={{textDecoration: "none"}} >
                <LargeLink href={props.href}>{props.children}</LargeLink>
            </Link>
        )
    } else {
        return(
            <Link href={props.href} passHref legacyBehavior style={{textDecoration: "none"}} >
                <StyledLink href={props.href}>{props.children}</StyledLink>
            </Link>
        )
    }
}