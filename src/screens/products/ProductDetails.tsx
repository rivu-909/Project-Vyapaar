import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import ConfirmRequestDailog from "../../components/dailogs/ConfirmRequestDailog";
import TradeDailog from "../../components/product/TradeDailog";
import TradeList from "../../components/product/TradeList";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import LoadingState from "../../schema/LoadingState";
import Product from "../../schema/products/Product";
import TradeType from "../../schema/products/TradeType";
import { DetailsScreenRouteProp } from "../../schema/ReactNavigation";
import { onShowTradeDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import getProductFromId from "../../utils/getProductFromId";

interface ProductDetailsProps {
    route: DetailsScreenRouteProp;
}

interface ProductDetailsStateProps {
    products: Array<Product>;
    token: string;
    detailsLoadingState: LoadingState;
}

interface ProductDetailsDispatchProps {
    fetchProduct: (token: string, productId: string) => void;
    onBidAsk: (productId: string, tradeType: TradeType) => void;
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
        props.onBidAsk(productId, TradeType.Bid);
    }, [productId]);

    const AskHandler = React.useCallback(() => {
        props.onBidAsk(productId, TradeType.Ask);
    }, [productId]);

    return !isTradesLoaded ? (
        <LoadingOverlay message="Loading..." />
    ) : (
        <>
            <View style={styles.screen}>
                <Heading label={product.name} />
                <View style={styles.productInfo}>
                    <Text>{product.description}</Text>
                    <Text>{product.price}</Text>
                </View>
                <TradeList trades={product.trades} productId={productId} />
                <Button label="Bid" onPress={BidHandler} />
                <Button label="Ask" onPress={AskHandler} />
            </View>
            <TradeDailog />
            <ConfirmRequestDailog />
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    productInfo: {
        alignItems: "center",
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
        onBidAsk: (productId: string, tradeType: TradeType) => {
            dispatch(onShowTradeDailog({ productId, tradeType }));
        },
    };
}

export default connect(mapState, mapDispatch)(ProductDetails);
