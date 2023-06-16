import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
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
import { Dispatch, RootState } from "../../store/store";

interface CreateTradeProps {
    navigation: CreateTradeScreenNavigationProp;
    route: CreateTradeScreenRouteProp;
}

interface CreateTradeStateProps {
    token: string;
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
    ) => void;
}

function CreateTrade(
    props: CreateTradeProps & CreateTradeStateProps & CreateTradeDispatchProps
) {
    const { tradeType, productId, trade } = props.route.params;

    const [inputs, setInputs] = React.useState<{
        price: string;
        quantity: string;
        firstLine: string;
        secondLine: string;
        district: string;
        state: string;
        pincode: string;
    }>(getInputs(null));

    React.useEffect(() => {
        setInputs(getInputs(trade));
    }, [trade]);

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
        props.onTradeSubmit(
            productId,
            props.token,
            inputs.price,
            {
                firstLine: inputs.firstLine,
                secondLine: inputs.secondLine,
                district: inputs.district,
                state: inputs.state,
                pincode: inputs.pincode,
            },
            tradeType,
            inputs.quantity,
            trade?._id
        );

        onClose();
    };

    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
            <Heading label="Create your bid" />
            <Input
                label="Price"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "price"),
                    value: inputs.price.toString(),
                    placeholder: "",
                }}
            />
            <Input
                label="Quantity"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "quantity"),
                    value: inputs.quantity,
                    placeholder: "100 L",
                }}
            />
            <Input
                label="Address first line"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "firstLine"),
                    value: inputs.firstLine,
                    placeholder: "Shop 5, Sobha Market...",
                }}
            />
            <Input
                label="Address Second Line"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "secondLine"),
                    value: inputs.secondLine,
                    placeholder: "Near Eco Park...",
                }}
            />
            <Input
                label="District"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "district"),
                    value: inputs.district,
                    placeholder: "Chandigarh",
                }}
            />
            <Input
                label="State"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "state"),
                    value: inputs.state,
                    placeholder: "Punjab",
                }}
            />
            <Input
                label="Pincode"
                textInputConfig={{
                    onChangeText: inputChangeHandler.bind(null, "pincode"),
                    value: inputs.pincode.toString(),
                    placeholder: "160014",
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

function getInputs(trade: ITrade | null) {
    const returnVal = {
        price: trade?.price ?? "",
        quantity: trade?.quantity ?? "",
        firstLine: trade?.address.firstLine ?? "",
        secondLine: trade?.address.secondLine ?? "",
        district: trade?.address.district ?? "",
        state: trade?.address.state ?? "",
        pincode: trade?.address.pincode.toString() ?? "",
    };
    return returnVal;
}

function mapState(state: RootState): CreateTradeStateProps {
    const user = state.user;
    return {
        token: user.token ?? "",
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
        ) => {
            dispatch(
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
    };
}

export default connect(mapState, mapDispatch)(CreateTrade);
