import LoadingState from "../LoadingState";
import Product from "./Product";

export default interface ProductState {
    products: Array<Product>;
    productsLoadingState: LoadingState;
    productDetailsLoadingState: LoadingState;
}
