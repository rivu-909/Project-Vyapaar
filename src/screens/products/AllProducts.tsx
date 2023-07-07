import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import Product from "../../schema/products/Product";
import React from "react";
import getProducts from "../../actions/product/getProducts";
import ProductList from "../../components/product/ProductList";
import LoadingState from "../../schema/LoadingState";
import logoutHandler from "../../actions/auth/logoutHandler";
import IconButton from "../../components/common/IconButton";
import { MaterialIcons } from "@expo/vector-icons";
import { CreateProductScreenNavigationProp } from "../../schema/ReactNavigation";
import { useNavigation } from "@react-navigation/native";
import {
    addProduct,
    updateProduct,
} from "../../store/reducer/products/productsSlice";
import { subscribe } from "../../store/ably";
import color from "../../colorPalette";

interface AllProductsStateProps {
    productLoadingState: LoadingState;
    products: Array<Product>;
    token: string;
}

interface AllProductsDispatchProps {
    fetchProducts: (token: string) => void;
    logout: () => void;
    addNewProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
}

function AllProducts(props: AllProductsStateProps & AllProductsDispatchProps) {
    React.useEffect(() => {
        if (props.productLoadingState !== LoadingState.Success) {
            props.fetchProducts(props.token);
        }
        subscribe(props.token, "create_product", (msg) =>
            props.addNewProduct(msg.data)
        );
        subscribe(props.token, "create_trade", (msg) => {
            props.updateProduct(msg.data);
        });
        subscribe(props.token, "update_trade", (msg) => {
            props.updateProduct(msg.data);
        });
    }, []);

    const navigation = useNavigation<CreateProductScreenNavigationProp>();

    const openCreateProductHandler = () => {
        navigation.navigate("CreateProduct");
    };

    return (
        <>
            <View style={styles.root}>
                {props.productLoadingState === LoadingState.Pending ? (
                    <LoadingOverlay message="Loading..." />
                ) : (
                    <>
                        <ProductList products={props.products} />
                        <View style={styles.buttonContainer}>
                            <IconButton
                                onPress={openCreateProductHandler}
                                containerStyle={styles.addIconContainer}
                                androidRippleColor={color.theme1000}
                            >
                                <MaterialIcons
                                    name="add"
                                    size={54}
                                    color="white"
                                />
                            </IconButton>
                        </View>
                    </>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    buttonContainer: {
        alignItems: "center",
    },
    addIconContainer: {
        margin: 0,
        backgroundColor: color.theme400,
        opacity: 0.8,
        height: 60,
        width: 60,
        borderRadius: 30,
        position: "absolute",
        bottom: 24,
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
        addNewProduct: (product: Product) => {
            dispatch(addProduct(product));
        },
        updateProduct: (product: Product) => {
            dispatch(updateProduct(product));
        },
    };
}

export default connect(mapState, mapDispatch)(AllProducts);
