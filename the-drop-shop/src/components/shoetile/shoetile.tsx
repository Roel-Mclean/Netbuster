import Image from "next/image";
import { ShoeTileInterface } from "./shoetile.types";
import styled from "styled-components";
import { getBase64ImageUrl } from "@/util/imageutil";
import { useRouter } from "next/router";

const StyledShoeTile = styled.div`
    padding: 8px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
    }
`;

const Text = styled.p`
    font-size: 20px;
    
`;


export const ShoeTile = ({shoe}: ShoeTileInterface) => {
    const router = useRouter();

    const isInStock = () => {
        return shoe.stock > 0;
    }

    //navigate to product page when tile is selected
    //include the product id as part of the path so it can be queried to get the full product
    const handleSelectedTile = () => {
        router.push(`/product/${encodeURIComponent(shoe.productId)}`)
    }

    return (
        <StyledShoeTile onClick={handleSelectedTile}>
            <Image 
                src={getBase64ImageUrl(shoe.images[0].data.data)}
                alt={shoe.images[0].name}
                style={{objectFit: 'contain'}}
                width={300}
                height={300}
            />
            <Text>{shoe.title}</Text>
            <Text>£{shoe.price} - {isInStock() ? 'In Stock' : 'Sold Out'}</Text>
        </StyledShoeTile>
    );
}