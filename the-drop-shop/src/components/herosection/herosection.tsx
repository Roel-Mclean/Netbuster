import styled from 'styled-components';
import { NavBar, PageLink } from '../componentsindex';
import { CallToAction } from '../calltoaction/calltoaction';

const StyledHeroSection = styled.section`
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: start;
    justify-items: center;

    width: 100vw;
    height: 100vh;
    position: relative;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/movie_catalogue.jpeg");
    background-size: 200%;

    animation: pan-image 60s linear infinite;
    animation-direction: alternate;

    @keyframes pan-image {
        from {
            background-position: 0% 0%;
        }

        to {
            background-position: 100% 100%;
        }
    }
`;

export const HeroSection = () => {
    return (
        <StyledHeroSection>
            <NavBar isTransparent highlightedLink='Home' />
            <CallToAction isTransparent={false} href='/shop'>Shop Now</CallToAction>
        </StyledHeroSection>
    );
}