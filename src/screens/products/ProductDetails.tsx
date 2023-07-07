import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import color from "../../colorPalette";
import Button from "../../components/common/Button";
import Label from "../../components/common/Label";
import ConfirmRequestDailog from "../../components/dailogs/ConfirmRequestDailog";
import TradeList from "../../components/product/TradeList";
import Product from "../../schema/products/Product";
import TradeType from "../../schema/products/TradeType";
import {
    DetailsScreenNavigationProp,
    DetailsScreenRouteProp,
} from "../../schema/ReactNavigation";
import { RootState } from "../../store/store";
import getFormattedDate from "../../utils/getFormattedDate";
import getProductFromId from "../../utils/getProductFromId";

interface ProductDetailsProps {
    route: DetailsScreenRouteProp;
    navigation: DetailsScreenNavigationProp;
}

interface ProductDetailsStateProps {
    products: Array<Product>;
    token: string;
}

function ProductDetails(props: ProductDetailsProps & ProductDetailsStateProps) {
    const productId = props.route.params.productId;
    const product = getProductFromId(props.products, productId);

    const BidHandler = React.useCallback(() => {
        props.navigation.navigate("CreateTrade", {
            productId,
            tradeType: TradeType.Bid,
            trade: null,
        });
    }, [productId]);

    const AskHandler = React.useCallback(() => {
        props.navigation.navigate("CreateTrade", {
            productId,
            tradeType: TradeType.Ask,
            trade: null,
        });
    }, [productId]);

    return (
        <>
            <View style={styles.root}>
                <View style={styles.productInfo}>
                    <View style={styles.descriptionContainer}>
                        <Label
                            label={product.description}
                            labelStyle={styles.textStyles}
                            containerStyle={styles.firstColumnContent}
                        />
                        <Label
                            label={`Last Updated: ${getFormattedDate(
                                product.updatedAt
                            )}`}
                            labelStyle={styles.timeStamp}
                            containerStyle={styles.firstColumnContent}
                        />
                    </View>
                    <Label
                        label={`₹ ${product.price}`}
                        labelStyle={styles.textStyles}
                        containerStyle={styles.priceContainer}
                    />
                </View>
                <TradeList trades={product.trades} productId={productId} />
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Bid"
                        onPress={BidHandler}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor={color.theme1000}
                    />
                    <Button
                        label="Ask"
                        onPress={AskHandler}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor={color.theme1000}
                    />
                </View>
            </View>
            <ConfirmRequestDailog />
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    productInfo: {
        flexDirection: "row",
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: color.dark100,
        paddingBottom: 4,
        marginBottom: 4,
    },
    descriptionContainer: {
        marginVertical: 0,
        flex: 3,
    },
    firstColumnContent: {
        marginVertical: 0,
        marginBottom: 4,
    },
    priceContainer: {
        marginVertical: 0,
        flex: 1,
        maxWidth: 100,
        alignItems: "flex-end",
    },
    textStyles: {
        fontSize: 16,
        color: color.dark800,
    },
    timeStamp: {
        fontSize: 12,
        color: color.dark100,
    },
    buttonsContainer: {
        flexDirection: "row",
        margin: 8,
    },
    buttonContainerStyle: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: color.theme400,
    },
    buttonLabelStyle: {
        color: "white",
    },
});

function mapState(state: RootState): ProductDetailsStateProps {
    const products = state.products;
    return {
        token: state.user.token || "",
        products: products.products,
    };
}

export default connect(mapState)(ProductDetails);
