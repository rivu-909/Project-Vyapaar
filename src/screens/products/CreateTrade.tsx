import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/productHandler";
import Button from "../../components/common/Button";
import Heading from "../../components/common/Heading";
import Input from "../../components/common/Input";
import Address from "../../schema/Address";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import {
    CreateTradeScreenNavigationProp,
    CreateTradeScreenRouteProp,
} from "../../schema/ReactNavigation";
import { setUserAddress } from "../../store/reducer/user/userSlice";
import { Dispatch, RootState } from "../../store/store";

interface CreateTradeProps {
    navigation: CreateTradeScreenNavigationProp;
    route: CreateTradeScreenRouteProp;
}

interface CreateTradeStateProps {
    token: string;
    address: Address | null;
}

interface CreateTradeDispatchProps {
    onTradeSubmit: (
        productId: string,
        token: string,
        price: string,
        address: Address,
        type: TradeType,
        quantity: string,
        tradeId?: string
    ) => Promise<any>;
    updateAddress: (address: Address) => void;
}

interface IInput {
    value: string;
    isValid: boolean;
}

function CreateTrade(
    props: CreateTradeProps & CreateTradeStateProps & CreateTradeDispatchProps
) {
    const { tradeType, productId, trade } = props.route.params;

    const [inputs, setInputs] = React.useState<{
        price: IInput;
        quantity: IInput;
        firstLine: IInput;
        secondLine: IInput;
        district: IInput;
        state: IInput;
        pincode: IInput;
    }>(getDefaultInputs(null, props.address));

    React.useEffect(() => {
        setInputs(getDefaultInputs(trade, props.address));
    }, [trade]);

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

        if (inputs.quantity.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                quantity: { value: "", isValid: false },
            }));
            return;
        }

        if (inputs.firstLine.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                firstLine: { value: "", isValid: false },
            }));
            return;
        }

        if (inputs.district.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                district: { value: "", isValid: false },
            }));
            return;
        }

        if (inputs.state.value.length === 0) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                state: { value: "", isValid: false },
            }));
            return;
        }

        const pincodeRegExp = /^\d{6}$/;
        if (!pincodeRegExp.test(inputs.pincode.value)) {
            setInputs((currentInputs) => ({
                ...currentInputs,
                pincode: { value: "", isValid: false },
            }));
            return;
        }

        const address = {
            firstLine: inputs.firstLine.value,
            secondLine: inputs.secondLine.value,
            district: inputs.district.value,
            state: inputs.state.value,
            pincode: inputs.pincode.value,
        };

        props
            .onTradeSubmit(
                productId,
                props.token,
                inputs.price.value,
                address,
                tradeType,
                inputs.quantity.value,
                trade?._id
            )
            .then(({ payload }) => {
                if (!payload.validationError) {
                    setInputs(getDefaultInputs(null, address));
                    onClose();
                } else {
                    if (payload.validationPath === "address") {
                        setInputs((currentInputs) => ({
                            ...currentInputs,
                            firstLine: { value: "", isValid: false },
                            district: { value: "", isValid: false },
                            state: { value: "", isValid: false },
                            pincode: { value: "", isValid: false },
                        }));
                    } else {
                        setInputs((currentInputs) => ({
                            ...currentInputs,
                            [payload.validationPath]: {
                                value: "",
                                isValid: false,
                            },
                        }));
                    }
                }
            });
        props.updateAddress(address);
    }, [inputs, trade, props.token, productId, tradeType]);

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
            <Heading
                label={`Create your ${
                    tradeType === TradeType.Bid ? "bid" : "ask"
                }`}
            />
            <Input
                label="Price"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "price"),
                    value: inputs.price.value.toString(),
                    placeholder: "250 (price per unit)",
                }}
                invalid={!inputs.price.isValid}
            />
            <Input
                label="Quantity"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "quantity"),
                    value: inputs.quantity.value,
                    placeholder: "100 L",
                }}
                invalid={!inputs.quantity.isValid}
            />
            <Input
                label="Address first line"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "firstLine"),
                    value: inputs.firstLine.value,
                    placeholder: "Shop 5, Sobha Market...",
                }}
                invalid={!inputs.firstLine.isValid}
            />
            <Input
                label="Address Second Line"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "secondLine"),
                    value: inputs.secondLine.value,
                    placeholder: "Near Eco Park...",
                }}
                invalid={!inputs.secondLine.isValid}
            />
            <Input
                label="District"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "district"),
                    value: inputs.district.value,
                    placeholder: "Chandigarh",
                }}
                invalid={!inputs.district.isValid}
            />
            <Input
                label="State"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "state"),
                    value: inputs.state.value,
                    placeholder: "Punjab",
                }}
                invalid={!inputs.state.isValid}
            />
            <Input
                label="Pincode"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "pincode"),
                    value: inputs.pincode.value.toString(),
                    placeholder: "160014",
                }}
                invalid={!inputs.pincode.isValid}
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
                    androidRippleColor="#505050"
                />
                <Button
                    onPress={onClose}
                    label="Cancel"
                    containerStyle={styles.buttonContainerStyle}
                    androidRippleColor="#d9d9d9"
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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

function getDefaultInputs(trade: ITrade | null, address: Address | null) {
    return {
        price: { value: trade?.price ?? "", isValid: true },
        quantity: { value: trade?.quantity ?? "", isValid: true },
        firstLine: {
            value: trade?.address.firstLine ?? address?.firstLine ?? "",
            isValid: true,
        },
        secondLine: {
            value: trade?.address.secondLine ?? address?.secondLine ?? "",
            isValid: true,
        },
        district: {
            value: trade?.address.district ?? address?.district ?? "",
            isValid: true,
        },
        state: {
            value: trade?.address.state ?? address?.state ?? "",
            isValid: true,
        },
        pincode: {
            value: trade?.address.pincode.toString() ?? address?.pincode ?? "",
            isValid: true,
        },
    };
}

function mapState(state: RootState): CreateTradeStateProps {
    return {
        token: state.user.token ?? "",
        address: state.user.address,
    };
}

function mapDispatch(dispatch: Dispatch): CreateTradeDispatchProps {
    return {
        onTradeSubmit: (
            productId: string,
            token: string,
            price: string,
            address: Address,
            type: TradeType,
            quantity: string,
            tradeId?: string
        ): Promise<any> => {
            return dispatch(
                tradeId
                    ? getProductDetails({
                          actionType: GetProductDetailsActionType.UpdateTrade,
                          productId,
                          tradeId,
                          token,
                          price,
                          address,
                          type,
                          quantity,
                      })
                    : getProductDetails({
                          actionType: GetProductDetailsActionType.CreateTrade,
                          productId,
                          token,
                          price,
                          address,
                          type,
                          quantity,
                      })
            );
        },
        updateAddress: (address: Address) => {
            dispatch(setUserAddress(address));
        },
    };
}

export default connect(mapState, mapDispatch)(CreateTrade);
