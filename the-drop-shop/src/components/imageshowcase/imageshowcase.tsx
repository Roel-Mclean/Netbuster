import NextImage from "next/image";
import { ImageShowcaseInterface } from "./imageshowcase.types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Image } from "@/types/product";
import { getBase64ImageUrl } from "@/util/imageutil";

const AdditionalImagesList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0;
    list-style-type: none;
`;

const ListItem = styled.li`
    &:hover {
        cursor: pointer
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ImageShowcase = (props: ImageShowcaseInterface) => {

    const [mainImage, setMainImage] = useState<Image>();

    useEffect(() => {
        setMainImage(props.images[0]);
    }, [props.images])

    return (
        <Container>
            <NextImage
                src={getBase64ImageUrl(mainImage ? mainImage.data.data : '')}
                alt={mainImage ? mainImage.name : 'Showcase image of shoe'}
                style={{objectFit: 'contain'}}
                width={800}
                height={800}
            />
            {/* <AdditionalImagesList>
                {props.images.map((image, index) => (
                    <ListItem key={index}>
                        <div onClick={(e) => setMainImage(image)}>
                            <NextImage
                                src={getBase64ImageUrl(image.data.data)}
                                alt={image.name}
                                style={{objectFit: 'contain'}}
                                width={230}
                                height={200}
                            />
                        </div>
                    </ListItem>
                ))}
            </AdditionalImagesList> */}
        </Container>
    );
}