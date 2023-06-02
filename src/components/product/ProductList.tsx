import { StyleSheet, Text, View } from "react-native";
import Product from "../../schema/products/Product";
import ProductCard from "./productCard";

interface ProductListProps {
    products: Array<Product>;
}

export default function ProductList(props: ProductListProps) {
    return (
        <View style={styles.productList}>
            {props.products.map((product) => (
                <ProductCard product={product} key={product._id} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    productList: {
        flex: 1,
        padding: 8,
    },
});
