import NextImage from "next/image";
import { ImageShowcaseInterface } from "./imageshowcase.types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Image } from "@/types/product";
import { getBase64ImageUrl } from "@/util/imageutil";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledImage = styled(NextImage)`
  width: 100%; // Make the image responsive
  height: auto; // Maintain the aspect ratio
`;

export const ImageShowcase = (props: ImageShowcaseInterface) => {

    const [mainImage, setMainImage] = useState<Image>();

    useEffect(() => {
        setMainImage(props.images[0]);
    }, [props.images])

    return (
        <Container>
            <StyledImage
                src={getBase64ImageUrl(mainImage ? mainImage.data.data : '')}
                alt={mainImage ? mainImage.name : 'Showcase image of shoe'}
                sizes="(max-width: 768px) 80vw"
                width={800}
                height={800}
            />
        </Container>
    );
}