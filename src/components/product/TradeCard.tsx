import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import ITrade from "../../schema/products/ITrade";
import { onShowRequestConfirmDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import Heading from "../common/Heading";
import IconButton from "../common/IconButton";
import { useNavigation } from "@react-navigation/native";
import { CreateTradeScreenNavigationProp } from "../../schema/ReactNavigation";

interface TradeCardProps {
    trade: ITrade;
    productId: string;
}

interface TradeCardStateProps {
    userId: string;
}

interface TradeCardDispatchProps {
    onRequest: (userId: string, productId: string, tradeId: string) => void;
}

function TradeCard(
    props: TradeCardProps & TradeCardStateProps & TradeCardDispatchProps
) {
    const { price, address, type } = props.trade;

    const requestHandler = React.useCallback(() => {
        props.onRequest(props.trade.userId, props.productId, props.trade._id);
    }, [props.trade.userId, props.productId, props.trade._id]);

    const navigation = useNavigation<CreateTradeScreenNavigationProp>();
    const editTradeHandler = React.useCallback(() => {
        navigation.navigate("CreateTrade", {
            productId: props.productId,
            tradeType: props.trade.type,
            trade: props.trade,
        });
    }, [props.productId, props.trade]);

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <Heading
                    label={`${address.district} | ${address.state}`}
                    labelStyle={styles.titleLabel}
                    containerStyle={styles.headingContainer}
                />
                <Heading
                    label={`₹ ${price}`}
                    labelStyle={styles.titleLabel}
                    containerStyle={styles.headingContainer}
                />
            </View>
            <View style={styles.buttonsContainer}>
                {props.userId !== props.trade.userId && (
                    <Button
                        label="Request"
                        onPress={requestHandler}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                    />
                )}
                {props.userId === props.trade.userId && (
                    <IconButton
                        onPress={editTradeHandler}
                        containerStyle={styles.iconButtonStyle}
                    >
                        <MaterialIcons name="edit" size={20} color="white" />
                    </IconButton>
                )}
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
    headingContainer: {
        marginHorizontal: 0,
        marginVertical: 8,
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
        paddingHorizontal: 10,
        paddingVertical: 12,
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
        onRequest: (userId: string, productId: string, tradeId: string) => {
            dispatch(
                onShowRequestConfirmDailog({ userId, productId, tradeId })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(TradeCard);
