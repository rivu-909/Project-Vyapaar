import { View } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import Product from "../../schema/products/Product";
import React from "react";
import getProducts from "../../actions/product/getProducts";
import Button from "../../components/common/Button";
import ProductList from "../../components/product/ProductList";
import ProductDailog from "../../components/product/ProductDailog";
import LoadingState from "../../schema/LoadingState";
import logoutHandler from "../../actions/auth/logoutHandler";
import { onShowProductDailog } from "../../store/reducer/appConfig/appConfigSlice";

interface UserHomeStateProps {
    productLoadingState: LoadingState;
    products: Array<Product>;
    token: string;
}

interface UserHomeDispatchProps {
    fetchProducts: (token: string) => void;
    logout: () => void;
    createProductHandler: () => void;
}

function UserHome(props: UserHomeStateProps & UserHomeDispatchProps) {
    React.useEffect(() => {
        props.fetchProducts(props.token);
    }, []);

    const onCreateProductClick = React.useCallback(() => {
        props.createProductHandler();
    }, []);

    return (
        <>
            <View style={{ flex: 1, justifyContent: "center" }}>
                {props.productLoadingState === LoadingState.pending ? (
                    <LoadingOverlay message="Loading..." />
                ) : (
                    <ProductList products={props.products} />
                )}

                <Button
                    label="Create new product"
                    onPress={onCreateProductClick}
                />
                <Button label="Log out" onPress={props.logout} />
            </View>
            <ProductDailog />
        </>
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
        createProductHandler: () => {
            dispatch(onShowProductDailog());
        },
    };
}

export default connect(mapState, mapDispatch)(UserHome);
