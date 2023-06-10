import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Product from "../../schema/products/Product";
import { DetailsScreenNavigationProp } from "../../schema/ReactNavigation";
import Heading from "../common/Heading";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const goToDetailsHandler = () => {
        navigation.navigate("Details", { productId: props.product.productId });
    };
    return (
        <Pressable
            onPress={goToDetailsHandler}
            android_ripple={{ color: "grey" }}
        >
            <View style={styles.card}>
                <Heading label={props.product.name} />
                <Text> {props.product.price}</Text>
            </View>
        </Pressable>
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
