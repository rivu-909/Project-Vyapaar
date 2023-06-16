import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import Input from "../../components/common/Input";
import { Dispatch, RootState } from "../../store/store";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import { CreateProductScreenNavigationProp } from "../../schema/ReactNavigation";

interface CreateProductProps {
    navigation: CreateProductScreenNavigationProp;
}

interface CreateProductStateProps {
    token: string;
}

interface CreateProductDispatchProps {
    onChangeProducts: (
        token: string,
        name: string,
        description: string,
        price: string
    ) => void;
}

function CreateProduct(
    props: CreateProductProps &
        CreateProductStateProps &
        CreateProductDispatchProps
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

    const onClose = () => {
        props.navigation.goBack();
    };

    const onSubmit = () => {
        props.onChangeProducts(
            props.token,
            inputs.name,
            inputs.description,
            inputs.price
        );
        setInputs(getInputs());
        onClose();
    };

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
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
                    onChangeText: inputChangeHandler.bind(null, "description"),
                    value: inputs.description,
                    placeholder: "Premium imported whiskey",
                }}
            />
            <View style={styles.buttonsContainer}>
                <Button
                    onPress={onSubmit}
                    label="Submit"
                    containerStyle={{
                        ...styles.buttonContainerStyle,
                        ...styles.buttonContainerDark,
                    }}
                    labelStyle={styles.buttonText}
                />
                <Button
                    onPress={onClose}
                    label="Cancel"
                    containerStyle={styles.buttonContainerStyle}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    contentStyle: {
        flexGrow: 1,
        marginHorizontal: 20,

        alignItems: "flex-start",
        justifyContent: "center",
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginRight: 20,
    },
    buttonContainerStyle: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
    buttonContainerDark: {
        backgroundColor: "black",
    },
    buttonText: {
        color: "white",
    },
});

function getInputs() {
    return {
        name: "",
        price: "",
        description: "",
    };
}

function mapState(state: RootState): CreateProductStateProps {
    return {
        token: state.user.token ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): CreateProductDispatchProps {
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
    };
}

export default connect(mapState, mapDispatch)(CreateProduct);
