import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ConfirmRequestDailog from "../../components/dailogs/ConfirmRequestDailog";
import TradeList from "../../components/product/TradeList";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import LoadingState from "../../schema/LoadingState";
import Product from "../../schema/products/Product";
import TradeType from "../../schema/products/TradeType";
import {
    DetailsScreenNavigationProp,
    DetailsScreenRouteProp,
} from "../../schema/ReactNavigation";
import { Dispatch, RootState } from "../../store/store";
import getProductFromId from "../../utils/getProductFromId";

interface ProductDetailsProps {
    route: DetailsScreenRouteProp;
    navigation: DetailsScreenNavigationProp;
}

interface ProductDetailsStateProps {
    products: Array<Product>;
    token: string;
    detailsLoadingState: LoadingState;
}

interface ProductDetailsDispatchProps {
    fetchProduct: (token: string, productId: string) => void;
}

function ProductDetails(
    props: ProductDetailsProps &
        ProductDetailsStateProps &
        ProductDetailsDispatchProps
) {
    const productId = props.route.params.productId;
    const product = getProductFromId(props.products, productId);
    const isTradesLoaded = !!product.trades;

    React.useEffect(() => {
        if (!isTradesLoaded) {
            props.fetchProduct(props.token, productId);
        }
    }, []);

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

    return !isTradesLoaded ? (
        <LoadingOverlay message="Loading..." />
    ) : (
        <>
            <View style={styles.screen}>
                <View style={styles.productInfo}>
                    <Heading
                        label={product.description}
                        labelStyle={styles.textStyles}
                        containerStyle={styles.headingContainer}
                    />
                    <Heading
                        label={`₹ ${product.price}`}
                        labelStyle={styles.textStyles}
                        containerStyle={styles.headingContainer}
                    />
                </View>
                <TradeList trades={product.trades} productId={productId} />
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Bid"
                        onPress={BidHandler}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                    />
                    <Button
                        label="Ask"
                        onPress={AskHandler}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
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
    headingContainer: {
        marginVertical: 0,
        marginTop: 16,
        paddingBottom: 8,
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
        detailsLoadingState: products.productDetailsLoadingState,
    };
}

function mapDispatch(dispatch: Dispatch): ProductDetailsDispatchProps {
    return {
        fetchProduct: (token: string, productId: string) => {
            dispatch(
                getProductDetails({
                    token,
                    productId,
                    actionType: GetProductDetailsActionType.FetchProduct,
                })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(ProductDetails);
