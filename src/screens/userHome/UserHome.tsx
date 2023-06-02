import { View } from "react-native";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import Product from "../../schema/products/Product";
import { useEffect } from "react";
import getProducts from "../../actions/product/getProducts";
import Button from "../../components/common/Button";
import ProductList from "../../components/product/ProductList";
import { logout } from "../../store/reducer/user/userSlice";

interface UserHomeStateProps {
    isLoading: boolean;
    isFetched: boolean;
    products: Array<Product>;
    token: string;
}

interface UserHomeDispatchProps {
    fetchProducts: (token: string) => void;
    logout: () => void;
}

function UserHome(props: UserHomeStateProps & UserHomeDispatchProps) {
    useEffect(() => {
        props.fetchProducts(props.token);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            {props.isLoading ? (
                <LoadingOverlay message="Loading..." />
            ) : (
                <ProductList products={props.products} />
            )}
            <Button label="Log out" onPress={props.logout} />
        </View>
    );
}

function mapState(state: RootState): UserHomeStateProps {
    return {
        token: state.user.token || "",
        isLoading: state.products.isLoading,
        isFetched: state.products.isFetched,
        products: state.products.products,
    };
}

function mapDispatch(dispatch: Dispatch): UserHomeDispatchProps {
    return {
        fetchProducts: (token: string) => {
            dispatch(getProducts({ token }));
        },
        logout: () => {
            dispatch(logout());
        },
    };
}

export default connect(mapState, mapDispatch)(UserHome);
