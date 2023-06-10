import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Product from "../../schema/products/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Array<Product>;
}

function renderProductCard({ item }: { item: Product }) {
    return <ProductCard product={item} />;
}

export default function ProductList(props: ProductListProps) {
    return (
        <View style={styles.productList}>
            <FlatList
                data={props.products}
                keyExtractor={(p) => p.productId}
                renderItem={renderProductCard}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    productList: {
        flex: 1,
        padding: 8,
    },
});
