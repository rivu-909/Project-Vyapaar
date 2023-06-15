import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import {
    onShowRequestConfirmDailog,
    onShowTradeDailog,
} from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import Heading from "../common/Heading";
import IconButton from "../common/IconButton";

interface TradeCardProps {
    trade: ITrade;
    productId: string;
}

interface TradeCardStateProps {
    userId: string;
}

interface TradeCardDispatchProps {
    onEdit: (productId: string, tradeType: TradeType, trade: ITrade) => void;
    onRequest: (userId: string, productId: string, tradeId: string) => void;
}

function TradeCard(
    props: TradeCardProps & TradeCardStateProps & TradeCardDispatchProps
) {
    const { price, address, type } = props.trade;

    const requestHandler = React.useCallback(() => {
        props.onRequest(props.userId, props.productId, props.trade._id);
    }, [props.userId, props.productId, props.trade._id]);

    const editTradeHandler = React.useCallback(() => {
        props.onEdit(props.productId, props.trade.type, props.trade);
    }, [props.productId, props.trade]);

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <Heading
                    label={`${address.district} | ${address.state}`}
                    labelStyle={styles.titleLabel}
                />
                <Heading label={`₹ ${price}`} labelStyle={styles.titleLabel} />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    label="Request"
                    onPress={requestHandler}
                    containerStyle={styles.buttonContainerStyle}
                    labelStyle={styles.buttonLabelStyle}
                />
                {props.userId === props.trade.userId ? (
                    <IconButton
                        onPress={editTradeHandler}
                        containerStyle={styles.iconButtonStyle}
                    >
                        <MaterialIcons name="edit" size={20} color="white" />
                    </IconButton>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 8,
        paddingHorizontal: 16,
        flex: 1,
        margin: 4,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        justifyContent: "space-between",
    },
    titleContainer: {
        marginHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleLabel: {
        fontSize: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonContainerStyle: {
        margin: 0,
        borderRadius: 8,
        backgroundColor: "#808080",
    },
    iconButtonStyle: {
        margin: 0,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: "#808080",
    },
    buttonLabelStyle: {
        color: "white",
    },
});

function mapState(state: RootState): TradeCardStateProps {
    return {
        userId: state.user.userId ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): TradeCardDispatchProps {
    return {
        onEdit: (productId: string, tradeType: TradeType, trade: ITrade) => {
            dispatch(onShowTradeDailog({ productId, tradeType, trade }));
        },
        onRequest: (userId: string, productId: string, tradeId: string) => {
            dispatch(
                onShowRequestConfirmDailog({ userId, productId, tradeId })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(TradeCard);
