import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import {
    onShowRequestConfirmDailog,
    onShowTradeDailog,
} from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import Heading from "../common/Heading";

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
            <Heading label={price} />
            <Text>{type}</Text>
            <Text>
                {address.district} | {address.state}
            </Text>
            <Button label="Request" onPress={requestHandler} />
            {props.userId === props.trade.userId ? (
                <Button label="Edit" onPress={editTradeHandler} />
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 8,
        flex: 1,
        margin: 4,
        backgroundColor: "white",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: "space-between",
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
