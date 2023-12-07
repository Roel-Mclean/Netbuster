export interface Product {
    productId: string;
    title: string;
    description: string;
    rating: number;
    price: number;
    images: Image[];
    stock: number;
    trailerURL: string;
}

export interface Image {
    imageId: string;
    name: string;
    data: {
        //returned as base64
        data: string;
    };
}

export interface Size {
    sizeId: string;
    size: number;
    stock: number;
}