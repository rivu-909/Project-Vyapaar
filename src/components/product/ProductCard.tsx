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
        navigation.navigate("Details", {
            productId: props.product.productId,
            name: props.product.name,
        });
    };
    return (
        <Pressable
            onPress={goToDetailsHandler}
            android_ripple={{ color: "grey" }}
        >
            <View style={styles.card}>
                <View>
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
                />
            </View>
        </Pressable>
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
    card: {
        padding: 12,
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 8,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
