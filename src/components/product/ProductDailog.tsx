import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import { onCloseProductDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface ProductDailogStateProps {
    visible: boolean;
    token: string;
}

interface ProductDailogDispatchProps {
    onChangeProducts: (
        token: string,
        name: string,
        description: string,
        price: string
    ) => void;
    onClose: () => void;
}

function ProductDailog(
    props: ProductDailogStateProps & ProductDailogDispatchProps
) {
    const [inputs, setInputs] = React.useState<{
        name: string;
        price: string;
        description: string;
    }>(getInputs());

    const inputChangeHandler = (
        inputIdentifier: string,
        enteredValue: string
    ) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: enteredValue,
            };
        });
    };

    const onSubmit = () => {
        console.log(inputs);
        props.onChangeProducts(
            props.token,
            inputs.name,
            inputs.description,
            inputs.price
        );
        setInputs(getInputs());
        props.onClose();
    };

    return (
        <DailogBox onClose={props.onClose} visible={props.visible}>
            <View style={styles.centeredView}>
                <Heading label="Create product" />
                <Input
                    label="Name"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "name"),
                        value: inputs.name,
                        placeholder: "Jack Daniel",
                    }}
                />
                <Input
                    label="Price"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "price"),
                        value: inputs.price,
                        placeholder: "2990 (Market price)",
                    }}
                />
                <Input
                    label="Description"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(
                            null,
                            "description"
                        ),
                        value: inputs.description,
                        placeholder: "Premium imported whiskey",
                    }}
                />
                <Button onPress={onSubmit} label="Submit" />
                <Button onPress={props.onClose} label="Cancel" />
            </View>
        </DailogBox>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

function getInputs() {
    return {
        name: "",
        price: "",
        description: "",
    };
}

function mapState(state: RootState): ProductDailogStateProps {
    return {
        visible: state.appConfig.productDailog.visible,
        token: state.user.token ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): ProductDailogDispatchProps {
    return {
        onChangeProducts: (
            token: string,
            name: string,
            description: string,
            price: string
        ) => {
            dispatch(
                getProductDetails({
                    actionType: GetProductDetailsActionType.CreateProduct,
                    token,
                    name,
                    description,
                    price,
                })
            );
        },
        onClose: () => {
            dispatch(onCloseProductDailog());
        },
    };
}

export default connect(mapState, mapDispatch)(ProductDailog);
