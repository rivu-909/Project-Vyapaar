import { View } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import Product from "../../schema/products/Product";
import React from "react";
import getProducts from "../../actions/product/getProducts";
import Button from "../../components/common/Button";
import ProductList from "../../components/product/ProductList";
import CreateProductDailog from "../../components/product/CreateProductDailog";
import LoadingState from "../../schema/LoadingState";
import logoutHandler from "../../actions/auth/logoutHandler";

interface UserHomeStateProps {
    productLoadingState: LoadingState;
    products: Array<Product>;
    token: string;
}

interface UserHomeDispatchProps {
    fetchProducts: (token: string) => void;
    logout: () => void;
}

function UserHome(props: UserHomeStateProps & UserHomeDispatchProps) {
    React.useEffect(() => {
        props.fetchProducts(props.token);
    }, []);

    const [createProductDailogVisibility, setCreateProductDailogVisibility] =
        React.useState<boolean>(false);

    const onCreateProductClick = React.useCallback(() => {
        setCreateProductDailogVisibility(true);
    }, []);

    const onCloseDailog = React.useCallback(() => {
        setCreateProductDailogVisibility(false);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            {props.productLoadingState === LoadingState.pending ? (
                <LoadingOverlay message="Loading..." />
            ) : (
                <ProductList products={props.products} />
            )}

            <Button label="Create new product" onPress={onCreateProductClick} />
            <Button label="Log out" onPress={props.logout} />
            <CreateProductDailog
                onClose={onCloseDailog}
                visible={createProductDailogVisibility}
            />
        </View>
    );
}

function mapState(state: RootState): UserHomeStateProps {
    const products = state.products;
    return {
        token: state.user.token || "",
        productLoadingState: products.productsLoadingState,
        products: products.products,
    };
}

function mapDispatch(dispatch: Dispatch): UserHomeDispatchProps {
    return {
        fetchProducts: (token: string) => {
            dispatch(getProducts({ token }));
        },
        logout: () => {
            logoutHandler(dispatch);
        },
    };
}

export default connect(mapState, mapDispatch)(UserHome);
