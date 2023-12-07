import { Image, Size } from "./product";

export interface BasketItem {
    productId: string;
    image: Image;
    title: string;
    price: number;
}