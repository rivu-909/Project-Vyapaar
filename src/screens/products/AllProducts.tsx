import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import Product from "../../schema/products/Product";
import React from "react";
import getProducts from "../../actions/product/getProducts";
import ProductList from "../../components/product/ProductList";
import ProductDailog from "../../components/product/ProductDailog";
import LoadingState from "../../schema/LoadingState";
import logoutHandler from "../../actions/auth/logoutHandler";
import { onShowProductDailog } from "../../store/reducer/appConfig/appConfigSlice";
import IconButton from "../../components/common/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { CreateProductScreenNavigationProp } from "../../schema/ReactNavigation";
import { useNavigation } from "@react-navigation/native";

interface AllProductsStateProps {
    productLoadingState: LoadingState;
    products: Array<Product>;
    token: string;
}

interface AllProductsDispatchProps {
    fetchProducts: (token: string) => void;
    logout: () => void;
    createProductHandler: () => void;
}

function AllProducts(props: AllProductsStateProps & AllProductsDispatchProps) {
    React.useEffect(() => {
        props.fetchProducts(props.token);
    }, []);

    const onCreateProductClick = React.useCallback(() => {
        props.createProductHandler();
    }, []);

    const navigation = useNavigation<CreateProductScreenNavigationProp>();
    const openCreateProductHandler = () => {
        navigation.navigate("CreateProduct");
    };

    return (
        <>
            <View style={styles.root}>
                {props.productLoadingState === LoadingState.pending ? (
                    <LoadingOverlay message="Loading..." />
                ) : (
                    <>
                        <ProductList products={props.products} />
                        <View style={styles.buttonContainer}>
                            <IconButton
                                onPress={openCreateProductHandler}
                                containerStyle={styles.addIconContainer}
                            >
                                <MaterialIcons
                                    name="add"
                                    size={40}
                                    color="white"
                                />
                            </IconButton>
                        </View>
                    </>
                )}
                {/* <Button label="Log out" onPress={props.logout} /> */}
            </View>
            <ProductDailog />
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    addIconContainer: {
        margin: 0,
        backgroundColor: "black",
        height: 48,
        width: 48,
        borderRadius: 12,
    },
    buttonContainer: {
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
    },
});

function mapState(state: RootState): AllProductsStateProps {
    const products = state.products;
    return {
        token: state.user.token || "",
        productLoadingState: products.productsLoadingState,
        products: products.products,
    };
}

function mapDispatch(dispatch: Dispatch): AllProductsDispatchProps {
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

export default connect(mapState, mapDispatch)(AllProducts);
