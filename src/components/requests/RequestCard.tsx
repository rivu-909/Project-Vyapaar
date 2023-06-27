import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import fetchConnection from "../../actions/requests/fetchConnection";
import respondToRequest from "../../actions/requests/respondToRequest";
import LoadingState from "../../schema/LoadingState";
import Product from "../../schema/products/Product";
import IConnection from "../../schema/user/IConnection";
import ITradeRequest from "../../schema/user/ITradeRequest";
import RequestStatus from "../../schema/user/RequestStatus";
import { onShowConnectionDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import Heading from "../common/Heading";

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
    getConnection: (token: string, tradeRequestId: string) => void;
    showConnectionDailog: (userName: string, phoneNumber: string) => void;
}

function RequestCard(
    props: RequestCardProps & RequestCardStateProps & RequestCardDispatchProps
) {
    const product = getProduct(props.request.productId, props.products);

    if (!product) {
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
        let index = props.connections.findIndex(
            (r) => r.tradeRequestId === props.request._id
        );
        if (index === -1) {
            if (props.connectionFetchingStatus !== LoadingState.pending) {
                props.getConnection(props.token, props.request._id);
            }
            index = props.connections.length;
            return;
        }

        props.showConnectionDailog(
            props.connections[index]?.name ?? null,
            props.connections[index]?.phoneNumber ?? null
        );
    }, [props.request._id, props.connections]);

    return (
        <View style={styles.card}>
            <Heading
                label={product.name}
                labelStyle={styles.headingLabelStyle}
                containerStyle={styles.headingContainerStyle}
            />
            <Heading
                label={props.request.status}
                labelStyle={styles.descriptionLabelStyle}
                containerStyle={styles.headingContainerStyle}
            />
            {props.received &&
                props.request.status === RequestStatus.Pending && (
                    <View style={styles.buttonsContainer}>
                        <Button
                            label="Approve"
                            onPress={onConfirm}
                            containerStyle={styles.buttonContainerStyle}
                            labelStyle={styles.buttonLabelStyle}
                            androidRippleColor="#505050"
                        />
                        <Button
                            label="Reject"
                            onPress={onReject}
                            containerStyle={styles.buttonContainerStyle}
                            labelStyle={styles.buttonLabelStyle}
                            androidRippleColor="#505050"
                        />
                    </View>
                )}
            {props.request.status === RequestStatus.Accepted && (
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Connect"
                        onPress={onConnect}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonLabelStyle}
                        androidRippleColor="#505050"
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headingContainerStyle: {
        marginVertical: 4,
    },
    headingLabelStyle: {
        fontSize: 24,
    },
    descriptionLabelStyle: {
        fontSize: 18,
    },
    priceLabelStyle: {
        fontSize: 24,
    },
    card: {
        padding: 12,
        margin: 4,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        justifyContent: "space-between",
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonContainerStyle: {
        margin: 0,
        marginLeft: 4,
        borderRadius: 8,
        backgroundColor: "#808080",
        marginRight: 8,
    },
    buttonLabelStyle: {
        color: "white",
    },
});

function getProduct(productId: string, products: Array<Product>) {
    return products.find((p) => p.productId === productId);
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
            dispatch(fetchConnection({ token, tradeRequestId }));
        },
        showConnectionDailog: (userName: string, phoneNumber: string) => {
            dispatch(onShowConnectionDailog({ userName, phoneNumber }));
        },
    };
}

export default connect(mapState, mapDispatch)(RequestCard);
