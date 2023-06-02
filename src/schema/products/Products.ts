import Product from "./Product";

interface Products {
    isLoading: boolean;
    isFetched: boolean;
    products: Array<Product>;
}

export default Products;
