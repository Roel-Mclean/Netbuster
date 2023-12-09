import { Product } from "./product";

export interface Order {
    orderId: string;
    products: Product[];
    customer: Customer;
    datePlaced: Date;
}

interface Customer {
    email: string;
    phone: string;
    fname: string;
    sname: string;
    address1: string;
    address2: string;
    postcode: string;
    city: string;
}