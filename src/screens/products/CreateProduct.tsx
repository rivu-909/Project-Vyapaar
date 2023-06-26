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
    ) => Promise<any>;
}

interface IInput {
    value: string;
    isValid: boolean;
}

function CreateProduct(
    props: CreateProductProps &
        CreateProductStateProps &
        CreateProductDispatchProps
) {
    const [inputs, setInputs] = React.useState<{
        name: IInput;
        price: IInput;
        description: IInput;
    }>(getDefaultInputs());

    const inputChangeHandler = (
        inputIdentifier: string,
        enteredValue: string
    ) => {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    };

    const onClose = React.useCallback(() => {
        props.navigation.goBack();
    }, []);

    const onSubmit = React.useCallback(() => {
        if (inputs.name.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                name: { value: "", isValid: false },
            }));
            return;
        }

        const priceRegExp = /^\d+(\.\d{1,2})?$/;
        if (
            inputs.price.value.length === 0 ||
            !priceRegExp.test(inputs.price.value)
        ) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                price: { value: "", isValid: false },
            }));
            return;
        }

        if (inputs.description.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                description: { value: "", isValid: false },
            }));
            return;
        }

        props
            .onChangeProducts(
                props.token,
                inputs.name.value,
                inputs.description.value,
                inputs.price.value
            )
            .then(({ payload }) => {
                if (!payload.validationError) {
                    setInputs(getDefaultInputs());
                    onClose();
                } else {
                    setInputs((currentInputs) => ({
                        ...currentInputs,
                        [payload.validationPath]: { value: "", isValid: false },
                    }));
                }
            });
    }, [inputs, props.token]);

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
                    value: inputs.name.value,
                    placeholder: "Jack Daniel",
                }}
                invalid={!inputs.name.isValid}
            />
            <Input
                label="Price"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "price"),
                    value: inputs.price.value,
                    placeholder: "2990 (Market price)",
                }}
                invalid={!inputs.price.isValid}
            />
            <Input
                label="Description"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "description"),
                    value: inputs.description.value,
                    placeholder: "Premium imported whiskey",
                }}
                invalid={!inputs.description.isValid}
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

function getDefaultInputs() {
    return {
        name: { value: "", isValid: true },
        price: { value: "", isValid: true },
        description: { value: "", isValid: true },
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
        ): Promise<any> => {
            return dispatch(
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
