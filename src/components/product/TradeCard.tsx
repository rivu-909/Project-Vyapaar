import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import ITrade from "../../schema/products/ITrade";
import { onShowRequestConfirmDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Label from "../common/Label";
import IconButton from "../common/IconButton";
import { useNavigation } from "@react-navigation/native";
import { CreateTradeScreenNavigationProp } from "../../schema/ReactNavigation";
import color from "../../colorPalette";
import getFormattedDate from "../../utils/getFormattedDate";
import getFormattedTime from "../../utils/getFormattedTime";

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
    const { price, address, type, quantity, createdAt } = props.trade;

    const requestHandler = React.useCallback(() => {
        props.onRequest(props.trade.userId, props.productId, props.trade._id);
    }, [props.trade.userId, props.productId, props.trade._id]);

    const navigation = useNavigation<CreateTradeScreenNavigationProp>();
    const editTradeHandler = React.useCallback(() => {
        navigation.navigate("CreateTrade", {
            productId: props.productId,
            tradeType: type,
            trade: props.trade,
        });
    }, [props.productId, props.trade, type]);

    return (
        <View style={styles.root}>
            <View style={styles.titleContainer}>
                <View style={styles.firstColumn}>
                    <Label
                        label={`${address.firstLine}`}
                        labelStyle={styles.defaultFont}
                        containerStyle={styles.addressContainer}
                    />
                    {address.secondLine?.length !== 0 && (
                        <Label
                            label={`${address.secondLine}`}
                            labelStyle={styles.defaultFont}
                            containerStyle={styles.addressContainer}
                        />
                    )}
                    <Label
                        label={`${address.district} | ${address.state}`}
                        labelStyle={styles.defaultFont}
                        containerStyle={styles.addressContainer}
                    />
                    <Label
                        label={`${address.pincode}`}
                        labelStyle={styles.defaultFont}
                        containerStyle={styles.addressContainer}
                    />
                    <Label
                        label={`Created: ${getFormattedDate(
                            createdAt
                        )} | ${getFormattedTime(createdAt)}`}
                        labelStyle={styles.timeStampFont}
                        containerStyle={styles.timestamp}
                    />
                </View>
                <View style={styles.secondColumn}>
                    <Label
                        label={`₹ ${price}`}
                        labelStyle={styles.defaultFont}
                        containerStyle={styles.secondColumnContent}
                    />
                    <Label
                        label={`Qty. ${quantity}`}
                        labelStyle={styles.defaultFont}
                        containerStyle={styles.secondColumnContent}
                    />
                    <View style={styles.buttonsContainer}>
                        {props.userId === props.trade.userId ? (
                            <IconButton
                                onPress={editTradeHandler}
                                containerStyle={styles.iconButtonStyle}
                            >
                                <MaterialIcons
                                    name="edit"
                                    size={20}
                                    color={color.dark800}
                                />
                            </IconButton>
                        ) : (
                            <IconButton
                                onPress={requestHandler}
                                containerStyle={styles.iconButtonStyle}
                            >
                                <MaterialIcons
                                    name="send"
                                    size={20}
                                    color={color.dark800}
                                />
                            </IconButton>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 12,
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 8,
        backgroundColor: color.theme100,
        borderRadius: 16,
        justifyContent: "space-between",
    },
    defaultFont: {
        fontSize: 16,
        color: color.dark800,
    },
    firstColumn: { flex: 2.5 },
    addressContainer: {
        margin: 0,
    },
    timestamp: {
        margin: 0,
        marginVertical: 8,
    },
    timeStampFont: {
        fontSize: 12,
        color: color.dark100,
    },
    secondColumn: { flex: 1 },
    secondColumnContent: {
        maxWidth: 150,
        alignItems: "flex-end",
    },
    titleContainer: {
        marginHorizontal: 4,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonsContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    iconButtonStyle: {
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: color.dark800,
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
