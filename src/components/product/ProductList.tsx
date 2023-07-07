import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Product from "../../schema/products/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Array<Product>;
}

export default function ProductList(props: ProductListProps) {
    return (
        <ScrollView>
            <View style={styles.productList}>
                {props.products.map((p) => (
                    <ProductCard product={p} key={p.productId} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    productList: {
        flex: 1,
        paddingHorizontal: 12,
    },
});
