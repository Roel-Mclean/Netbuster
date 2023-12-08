import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import products from "../../carouseldata.json"
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const SlideDirection = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`

const Left = styled.div`
    background-color: #C60D0D;
    opacity: 0.6;
    color: #fff;
    padding: 10px 10px 10px 13px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute; /* Add absolute positioning */
    top: 0; /* Vertically center the indicator */
    transform: translateY(-600%);
    left: 10px; /* Adjust the left position as needed */
`

const Right = styled.div`
    background-color: #C60D0D;
    opacity: 0.6;
    color: #fff;
    padding: 10px 10px 10px 13px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute; /* Add absolute positioning */
    top: 50%; /* Vertically center the indicator */
    transform: translateY(-600%);
    right: 10px; /* Adjust the right position as needed */
`

const Indicator = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
`

const Dot = styled.div<DotProps>`
    background-color: ${(props) => (props.isActive ? "#C60D0D" : "#333")};
    width: 15px;
    height: 15px;
    border-radius: 50%;
    
`
interface DotProps {
    isActive: boolean;
}

export const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === products.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? products.length - 1 : prevIndex - 1
    );
  };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
        <Link href={products[currentIndex].productPath}>
            <Image
                alt={products[currentIndex].title}
                width={0}
                height={0}
                // sizes="100vw"
                key={currentIndex}
                loader={() => products[currentIndex].imageURL}
                style={{width: "100%", height: "75vh", objectFit: "cover"}}
                content=""
            src={products[currentIndex].imageURL}
            />
        </Link>
        <SlideDirection className="slide_direction">
        <Left onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </Left>
        <Right onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </Right>
      </SlideDirection>
      <Indicator>
        {products.map((_, index) => (
          <Dot
            key={index}
            isActive={currentIndex === index}
            onClick={() => handleDotClick(index)}
          ></Dot>
        ))}
      </Indicator>
    </div>
  );
};