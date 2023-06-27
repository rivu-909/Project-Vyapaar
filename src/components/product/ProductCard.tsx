import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import Product from "../../schema/products/Product";
import { DetailsScreenNavigationProp } from "../../schema/ReactNavigation";
import Heading from "../common/Heading";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    const navigation = useNavigation<DetailsScreenNavigationProp>();
    const goToDetailsHandler = () => {
        navigation.navigate("Details", {
            productId: props.product.productId,
            name: props.product.name,
        });
    };
    return (
        <View style={styles.card}>
            <Pressable
                onPress={goToDetailsHandler}
                android_ripple={{ color: "#d5d5d5" }}
            >
                <View style={styles.cardInner}>
                    <View style={styles.descriptionContainerStyle}>
                        <Heading
                            label={props.product.name}
                            labelStyle={styles.headingLabelStyle}
                            containerStyle={styles.headingContainerStyle}
                        />
                        <Heading
                            label={props.product.description}
                            labelStyle={styles.descriptionLabelStyle}
                            containerStyle={styles.headingContainerStyle}
                        />
                    </View>
                    <Heading
                        label={`₹ ${props.product.price}`}
                        labelStyle={styles.priceLabelStyle}
                        containerStyle={styles.priceContainerStyle}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headingContainerStyle: {
        marginVertical: 4,
    },
    headingLabelStyle: {
        fontSize: 24,
    },
    descriptionLabelStyle: {
        fontSize: 18,
    },
    priceLabelStyle: {
        fontSize: 24,
    },
    descriptionContainerStyle: {
        flex: 2.5,
    },
    priceContainerStyle: {
        flex: 1,
        maxWidth: 100,
        alignItems: "center",
    },
    cardInner: {
        padding: 12,
        flex: 1,
        flexDirection: "row",
        overflow: "hidden",
    },
    card: {
        backgroundColor: "#F5F5F5",
        overflow: "hidden",
        margin: 4,
        borderRadius: 8,
    },
});
