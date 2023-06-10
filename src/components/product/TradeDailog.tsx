import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import getProductDetails from "../../actions/product/getProductDetails";
import Address from "../../schema/Address";
import GetProductDetailsActionType from "../../schema/GetProductDetailsActionType";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import { onTradeDailogClose } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";
import Input from "../common/Input";

interface TradeDailogStateProps {
    token: string;
    visible: boolean;
    tradeType: TradeType;
    productId: string;
    trade: ITrade | null;
}

interface TradeDailogDispatchProps {
    onCloseDailog: () => void;
    editProductTrades: (
        productId: string,
        token: string,
        price: string,
        address: Address,
        type: TradeType,
        quantity: string,
        tradeId?: string
    ) => void;
}

function TradeDailog(props: TradeDailogStateProps & TradeDailogDispatchProps) {
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
        setInputs(getInputs(props.trade));
    }, [props.trade]);

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
        setInputs(getInputs(null));
        props.onCloseDailog();
    };

    const onSubmit = () => {
        props.editProductTrades(
            props.productId,
            props.token,
            inputs.price,
            {
                firstLine: inputs.firstLine,
                secondLine: inputs.secondLine,
                district: inputs.district,
                state: inputs.state,
                pincode: inputs.pincode,
            },
            props.tradeType,
            inputs.quantity,
            props.trade?._id
        );

        onClose();
    };

    return (
        <DailogBox onClose={onClose} visible={props.visible}>
            <View style={styles.centeredView}>
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
                <Button onPress={onClose} label="Cancel" />
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

function mapState(state: RootState): TradeDailogStateProps {
    const user = state.user;
    return {
        token: user.token ?? "",
        ...state.appConfig.tradeDailog,
    };
}

function mapDispatch(dispatch: Dispatch): TradeDailogDispatchProps {
    return {
        onCloseDailog: () => {
            dispatch(onTradeDailogClose());
        },
        editProductTrades: (
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

export default connect(mapState, mapDispatch)(TradeDailog);
