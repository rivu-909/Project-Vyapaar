import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import ConfirmRequestDailog from "../../components/dailogs/ConfirmRequestDailog";
import TradeList from "../../components/product/TradeList";
import Product from "../../schema/products/Product";
import TradeType from "../../schema/products/TradeType";
import {
    DetailsScreenNavigationProp,
    DetailsScreenRouteProp,
} from "../../schema/ReactNavigation";
import { RootState } from "../../store/store";
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
            <View style={styles.screen}>
                <View style={styles.productInfo}>
                    <Heading
                        label={product.description}
                        labelStyle={styles.textStyles}
                        containerStyle={styles.descriptionContainer}
                    />
                    <Heading
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
                        androidRippleColor="#505050"
                    />
                    <Button
                        label="Ask"
                        onPress={AskHandler}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor="#505050"
                    />
                </View>
            </View>
            <ConfirmRequestDailog />
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    descriptionContainer: {
        marginVertical: 0,
        marginTop: 16,
        paddingBottom: 8,
        flex: 3,
    },
    priceContainer: {
        marginVertical: 0,
        marginTop: 16,
        paddingBottom: 8,
        flex: 1,
        maxWidth: 100,
        alignItems: "center",
    },
    productInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 28,
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    textStyles: {
        fontSize: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        margin: 8,
    },
    buttonContainerStyle: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: "black",
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
