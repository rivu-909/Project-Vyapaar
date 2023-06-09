import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import CreateTradeDailog from "../../components/product/CreateTradeDailog";
import TradeList from "../../components/product/Tradelist";
import LoadingState from "../../schema/LoadingState";
import Product from "../../schema/products/Product";
import { DetailsScreenRouteProp } from "../../schema/ReactNavigation";
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

    const [createTradeDailogVisibility, setCreateTradeDailogVisibility] =
        React.useState<boolean>(false);

    const bidClickHandler = React.useCallback(() => {
        setCreateTradeDailogVisibility(true);
    }, []);

    const onCloseTradeDailog = React.useCallback(() => {
        setCreateTradeDailogVisibility(false);
    }, []);

    return !isTradesLoaded ? (
        <LoadingOverlay message="Loading..." />
    ) : (
        <View style={styles.screen}>
            <Heading label={product.name} />
            <View style={styles.productInfo}>
                <Text>{product.description}</Text>
                <Text>{product.price}</Text>
            </View>
            <TradeList trades={product.trades} />
            <Button label="BID" onPress={bidClickHandler} />
            <CreateTradeDailog
                onClose={onCloseTradeDailog}
                visible={createTradeDailogVisibility}
            />
        </View>
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
            dispatch(getProductDetails({ token, productId }));
        },
    };
}

export default connect(mapState, mapDispatch)(ProductDetails);
