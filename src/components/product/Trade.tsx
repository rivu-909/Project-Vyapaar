import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import ITrade from "../../schema/products/ITrade";
import TradeType from "../../schema/products/TradeType";
import { onShowTradeDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import Heading from "../common/Heading";

interface TradeProps {
    trade: ITrade;
    productId: string;
}

interface TradeStateProps {
    userId: string;
}

interface TradeDispatchProps {
    onEdit: (productId: string, tradeType: TradeType, trade: ITrade) => void;
}

function Trade(props: TradeProps & TradeStateProps & TradeDispatchProps) {
    const { price, address, type } = props.trade;
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

function mapState(state: RootState): TradeStateProps {
    return {
        userId: state.user.userId ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): TradeDispatchProps {
    return {
        onEdit: (productId: string, tradeType: TradeType, trade: ITrade) => {
            dispatch(onShowTradeDailog({ productId, tradeType, trade }));
        },
    };
}

export default connect(mapState, mapDispatch)(Trade);
