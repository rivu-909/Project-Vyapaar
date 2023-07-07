import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, View } from "react-native";
import color from "../../colorPalette";
import Product from "../../schema/products/Product";
import TradeType from "../../schema/products/TradeType";
import { DetailsScreenNavigationProp } from "../../schema/ReactNavigation";
import getFormattedDate from "../../utils/getFormattedDate";
import Label from "../common/Label";

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
    let bidsCount = 0;
    let asksCount = 0;
    props.product.trades.forEach((t) => {
        if (t.type === TradeType.Bid) {
            bidsCount++;
        } else {
            asksCount++;
        }
    });
    return (
        <View style={styles.card}>
            <Pressable
                onPress={goToDetailsHandler}
                android_ripple={{ color: "#d5d5d5" }}
            >
                <View style={styles.cardInner}>
                    <View style={styles.topHeader}>
                        <Label
                            label={props.product.name}
                            labelStyle={styles.titleFont}
                            containerStyle={styles.titleContainerStyle}
                        />
                        <Label
                            label={`₹ ${props.product.price}`}
                            labelStyle={styles.titleFont}
                            containerStyle={styles.priceContainerStyle}
                        />
                    </View>
                    <View style={styles.midContent}>
                        <Label
                            label={props.product.description}
                            labelStyle={styles.midContentLabel}
                            containerStyle={styles.midContentContainer}
                        />
                        <Label
                            label={`BIDS: ${bidsCount} | ASKS: ${asksCount}`}
                            labelStyle={styles.midContentLabel}
                            containerStyle={styles.midContentContainer}
                        />
                    </View>
                    <Label
                        label={`Last updated: ${getFormattedDate(
                            props.product.updatedAt
                        )}`}
                        labelStyle={styles.timestampLabel}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: color.theme100,
        overflow: "hidden",
        marginBottom: 8,
        borderRadius: 16,
    },
    cardInner: {
        padding: 12,
        flex: 1,
        overflow: "hidden",
    },
    topHeader: {
        flexDirection: "row",
        marginBottom: 8,
    },
    titleContainerStyle: {
        marginVertical: 0,
        flex: 2.5,
    },
    titleFont: {
        fontSize: 20,
        color: color.dark800,
    },
    priceContainerStyle: {
        marginVertical: 0,
        flex: 1,
        width: 100,
        alignItems: "flex-end",
    },
    midContent: {
        marginBottom: 4,
    },
    midContentLabel: {
        fontSize: 16,
        color: color.dark400,
    },
    midContentContainer: {
        marginVertical: 0,
        marginBottom: 4,
    },
    timestampLabel: {
        fontSize: 12,
        color: color.dark100,
    },
});
