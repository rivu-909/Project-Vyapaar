import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import fetchConnection from "../../actions/requests/fetchConnection";
import respondToRequest from "../../actions/requests/respondToRequest";
import color from "../../colorPalette";
import Address from "../../schema/Address";
import LoadingState from "../../schema/LoadingState";
import Product from "../../schema/products/Product";
import IConnection from "../../schema/user/IConnection";
import ITradeRequest from "../../schema/user/ITradeRequest";
import RequestStatus from "../../schema/user/RequestStatus";
import { onShowConnectionDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import getFormattedDate from "../../utils/getFormattedDate";
import getFormattedTime from "../../utils/getFormattedTime";
import Button from "../common/Button";
import Label from "../common/Label";

interface RequestCardProps {
    request: ITradeRequest;
    received: boolean;
}

interface RequestCardStateProps {
    products: Array<Product>;
    token: string;
    connections: Array<IConnection>;
    connectionFetchingStatus: LoadingState;
}

interface RequestCardDispatchProps {
    respondToTradeRequest: (
        updatedStatus: RequestStatus,
        token: string,
        tradeRequestId: string
    ) => void;
    getConnection: (token: string, tradeRequestId: string) => Promise<any>;
    showConnectionDailog: (
        userName: string,
        phoneNumber: string,
        address: Address
    ) => void;
}

function RequestCard(
    props: RequestCardProps & RequestCardStateProps & RequestCardDispatchProps
) {
    const product = getProduct(props.request.productId, props.products);
    if (!product) {
        return null;
    }

    const trade = getTrade(props.request.tradeId, product);
    if (!trade) {
        return null;
    }

    const onConfirm = React.useCallback(() => {
        props.respondToTradeRequest(
            RequestStatus.Accepted,
            props.token,
            props.request._id
        );
    }, [props.token, props.request._id]);

    const onReject = React.useCallback(() => {
        props.respondToTradeRequest(
            RequestStatus.Rejected,
            props.token,
            props.request._id
        );
    }, [props.token, props.request._id]);

    const onConnect = React.useCallback(() => {
        const connections = props.connections;
        let index = connections.findIndex(
            (c) =>
                (props.received && c.userId === props.request.senderId) ||
                (!props.received && c.userId === props.request.receiverId)
        );

        if (
            index === -1 &&
            props.connectionFetchingStatus !== LoadingState.Pending
        ) {
            props
                .getConnection(props.token, props.request._id)
                .then(({ payload }) => {
                    props.showConnectionDailog(
                        payload?.name ?? null,
                        payload?.phoneNumber ?? null,
                        trade.address
                    );
                });
        } else {
            props.showConnectionDailog(
                connections[index]?.name ?? null,
                connections[index]?.phoneNumber ?? null,
                trade.address
            );
        }
    }, [
        props.connections,
        props.request._id,
        props.connectionFetchingStatus,
        props.token,
        trade.address,
    ]);

    const renderFirstButton = React.useCallback(() => {
        switch (props.request.status) {
            case RequestStatus.Accepted:
                return (
                    <Button
                        label="Connect"
                        onPress={onConnect}
                        containerStyle={styles.buttonContainerStyle}
                        innerContainerStyle={styles.buttonInnerContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor={color.theme1000}
                    />
                );
            case RequestStatus.Pending:
                return props.received ? (
                    <Button
                        label="Approve"
                        onPress={onConfirm}
                        containerStyle={styles.buttonContainerStyle}
                        innerContainerStyle={styles.buttonInnerContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor={color.theme1000}
                    />
                ) : (
                    <Button
                        label="Pending"
                        onPress={() => {}}
                        containerStyle={{
                            ...styles.buttonContainerStyle,
                            backgroundColor: color.dark300,
                        }}
                        innerContainerStyle={styles.buttonInnerContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                    />
                );
            case RequestStatus.Rejected:
                return (
                    <Button
                        label="Rejected"
                        onPress={() => {}}
                        containerStyle={{
                            ...styles.buttonContainerStyle,
                            backgroundColor: color.dark300,
                        }}
                        innerContainerStyle={styles.buttonInnerContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                    />
                );
        }
    }, [props.request.status, props.received, onConnect, onConfirm]);

    return (
        <View style={styles.card}>
            <View style={styles.descriptionContainer}>
                <View style={styles.firstColumn}>
                    <Label
                        label={product.name}
                        labelStyle={styles.titleFont}
                        containerStyle={styles.titleContainerStyle}
                    />
                    <Label
                        label={`${trade.address.district} | ${trade.address.state}`}
                        labelStyle={styles.midContentLabel}
                        containerStyle={styles.midContent}
                    />
                    <Label
                        label={`${
                            props.received ? "Received" : "Sent"
                        }: ${getFormattedDate(
                            trade.createdAt
                        )} | ${getFormattedTime(trade.createdAt)}`}
                        labelStyle={styles.timeStampFont}
                        containerStyle={styles.timestamp}
                    />
                </View>
                <View style={styles.secondColumn}>
                    <Label
                        label={`₹ ${trade.price}`}
                        labelStyle={styles.midContentLabel}
                        containerStyle={styles.secondColumnContent}
                    />
                    <Label
                        label={`Qty. ${trade.quantity}`}
                        labelStyle={styles.midContentLabel}
                        containerStyle={styles.secondColumnContent}
                    />
                </View>
            </View>
            {
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonWrapper}>
                        {renderFirstButton()}
                    </View>
                    <View style={styles.buttonWrapper}>
                        {props.received &&
                            props.request.status === RequestStatus.Pending && (
                                <Button
                                    label="Reject"
                                    onPress={onReject}
                                    containerStyle={{
                                        ...styles.buttonContainerStyle,
                                        backgroundColor: color.red400,
                                    }}
                                    innerContainerStyle={
                                        styles.buttonInnerContainerStyle
                                    }
                                    labelStyle={styles.buttonLabelStyle}
                                    androidRippleColor={color.red800}
                                />
                            )}
                    </View>
                </View>
            }
            {props.request.status === RequestStatus.Accepted && (
                <View style={styles.buttonsContainer}></View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        marginHorizontal: 12,
        marginBottom: 8,
        backgroundColor: color.theme100,
        borderRadius: 16,
    },
    descriptionContainer: {
        flexDirection: "row",
        marginBottom: 8,
    },
    firstColumn: {
        flex: 2.5,
    },
    secondColumn: {
        flex: 1,
        maxWidth: 150,
    },
    titleFont: {
        fontSize: 20,
        color: color.dark800,
    },
    midContent: {
        marginVertical: 0,
        marginBottom: 4,
    },
    midContentLabel: {
        fontSize: 16,
        color: color.dark400,
    },
    secondColumnContent: {
        alignItems: "flex-end",
        marginVertical: 0,
        marginBottom: 4,
    },
    timestamp: {
        marginVertical: 0,
    },
    timeStampFont: {
        fontSize: 12,
        color: color.dark100,
    },
    titleContainerStyle: {
        marginVertical: 0,
        marginBottom: 8,
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonWrapper: {
        flex: 1,
    },
    buttonContainerStyle: {
        margin: 0,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: color.theme400,
        flex: 1,
    },
    buttonInnerContainerStyle: {
        paddingVertical: 6,
    },
    buttonLabelStyle: {
        color: "white",
    },
});

function getProduct(productId: string, products: Array<Product>) {
    return products.find((p) => p.productId === productId);
}

function getTrade(tradeId: string, product: Product) {
    return product.trades.find((t) => t._id === tradeId);
}

function mapState(state: RootState): RequestCardStateProps {
    const user = state.user;
    return {
        products: state.products.products,
        token: user.token ?? "",
        connections: user.connections,
        connectionFetchingStatus: user.connectionState,
    };
}
function mapDispatch(dispatch: Dispatch): RequestCardDispatchProps {
    return {
        respondToTradeRequest: (
            updatedStatus: RequestStatus,
            token: string,
            tradeRequestId: string
        ) => {
            dispatch(
                respondToRequest({
                    updatedStatus,
                    token,
                    tradeRequestId,
                })
            );
        },
        getConnection: (token: string, tradeRequestId: string) => {
            return dispatch(fetchConnection({ token, tradeRequestId }));
        },
        showConnectionDailog: (
            userName: string,
            phoneNumber: string,
            address: Address
        ) => {
            dispatch(
                onShowConnectionDailog({ userName, phoneNumber, address })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(RequestCard);
