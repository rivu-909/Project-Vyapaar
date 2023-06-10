import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import { userDataKey } from "../../constants";
import Address from "../../schema/Address";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import TradeType from "../../schema/products/TradeType";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface TradeDailogProps {
    visible: boolean;
    onClose: () => void;
    tradeType: TradeType;
    productId: string;
    tradeId?: string;
}

interface TradeDailogStateProps {
    token: string;
    userId: string;
}

interface TradeDailogDispatchProps {
    editProductTrades: (
        productId: string,
        token: string,
        userId: string,
        price: string,
        address: Address,
        type: TradeType,
        quantity: string,
        _id?: string
    ) => void;
}

function TradeDailog(
    props: TradeDailogProps & TradeDailogStateProps & TradeDailogDispatchProps
) {
    const [inputs, setInputs] = React.useState<{
        price: string;
        quantity: string;
        firstLine: string;
        secondLine: string;
        district: string;
        state: string;
        pincode: string;
    }>({
        price: "",
        quantity: "",
        firstLine: "",
        secondLine: "",
        district: "",
        state: "",
        pincode: "",
    });

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
        props.editProductTrades(
            props.productId,
            props.token,
            props.userId,
            inputs.price,
            {
                firstLine: inputs.firstLine,
                secondLine: inputs.secondLine,
                district: inputs.district,
                state: inputs.state,
                pincode: inputs.pincode,
            },
            props.tradeType,
            inputs.quantity
        );
        props.onClose();
    };

    return (
        <DailogBox onClose={props.onClose} visible={props.visible}>
            <View style={styles.centeredView}>
                <Heading label="Create your bid" />
                <Input
                    label="Price"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(null, "price"),
                        value: inputs.price.toString(),
                        placeholder: "150000",
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
                        onChangeText: inputChangeHandler.bind(
                            null,
                            "firstLine"
                        ),
                        value: inputs.firstLine,
                        placeholder: "Shop 5, Sobha Market...",
                    }}
                />
                <Input
                    label="Address Second Line"
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(
                            null,
                            "secondLine"
                        ),
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

function mapState(state: RootState): TradeDailogStateProps {
    const user = state.user;
    return { token: user.token ?? "", userId: user.userId ?? "" };
}

function mapDispatch(dispatch: Dispatch): TradeDailogDispatchProps {
    return {
        editProductTrades: (
            productId: string,
            token: string,
            userId: string,
            price: string,
            address: Address,
            type: TradeType,
            quantity: string,
            _id?: string
        ) => {
            dispatch(
                getProductDetails({
                    actionType: GetProductDetailsActionType.CreateTrade,
                    productId,
                    token,
                    price,
                    address,
                    type,
                    quantity,
                    userId,
                })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(TradeDailog);
