import Product from "../schema/products/Product";

export default function getProductFromId(
    products: Array<Product>,
    productId: string
): Product {
    return products.find((p) => p.productId === productId)!;
}
