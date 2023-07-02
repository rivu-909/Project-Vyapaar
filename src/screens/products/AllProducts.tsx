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
import { subscribe } from "../../store/channel";
// import { useChannel } from "@ably-labs/react-hooks";

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
        if (props.productLoadingState !== LoadingState.success) {
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
        // async function setChannel() {
        //     channel = await getChannel(props.token);
        //     console.log("channel is set");
        //     channel.subscribe("create_product", (signal) => {
        //         props.addNewProduct(signal.data);
        //     });
        // }
        // setChannel();
    }, []);

    const navigation = useNavigation<CreateProductScreenNavigationProp>();
    // const channel = useChannel("test", "create_product", (signal) => {
    //     props.addNewProduct(signal.data);
    //     // console.log(signal);
    // });

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
                                androidRippleColor="#787878"
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
        backgroundColor: "#696969",
        height: 60,
        width: 60,
        borderRadius: 30,
        position: "absolute",
        bottom: 20,
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
