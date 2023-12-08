import styled from "styled-components"

const StyledFooter = styled.footer`
    width: 100vw;
    height: 80px;
    line-height: 80px;
    background-color: #1F1F1F;
    position: relative;
    bottom: 0;
    text-align: center;
    font-size: 32px;
    color: #FFF;
`;

export const Footer = () => {
    return (
        <StyledFooter>Netbuster</StyledFooter>
    );
}