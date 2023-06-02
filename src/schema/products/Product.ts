import Address from "./Address";

interface Product {
    category: string;
    quantity: string;
    price: number;
    address: Address;
    description: string;
    userId: string;
    _id: string;
}

export default Product;
