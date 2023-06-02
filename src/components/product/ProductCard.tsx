import { StyleSheet, Text, View } from "react-native";
import Product from "../../schema/products/Product";
import Heading from "../common/Heading";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    return (
        <View style={styles.card}>
            <Heading label={props.product.description} />
            <Text> {props.product.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 8,
        flex: 1,
        margin: 4,
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
