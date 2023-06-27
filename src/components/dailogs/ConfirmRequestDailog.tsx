import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import sendTradeRequests from "../../actions/requests/sendTradeRequest";
import ITradeRequest from "../../schema/user/ITradeRequest";
import { onCloseRequestConfirmDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Heading from "../common/Heading";

interface ConfirmRequestDailogStateProps {
    visible: boolean;
    receiverId: string;
    productId: string;
    tradeId: string;
    token: string;
    sentTradeRequests: Array<ITradeRequest>;
}

interface ConfirmRequestDailogDispatchProps {
    onCancelRequest: () => void;
    onConfirmRequest: (
        receiverId: string,
        productId: string,
        tradeId: string,
        token: string
    ) => void;
}

function ConfirmRequestDailog(
    props: ConfirmRequestDailogStateProps & ConfirmRequestDailogDispatchProps
) {
    const onConfirm = React.useCallback(() => {
        if (props.sentTradeRequests.find((r) => r.tradeId === props.tradeId)) {
            props.onCancelRequest();
            return;
        }
        props.onConfirmRequest(
            props.receiverId,
            props.productId,
            props.tradeId,
            props.token
        );
        props.onCancelRequest();
    }, [props.receiverId, props.productId, props.tradeId, props.token]);

    return (
        <DailogBox onClose={props.onCancelRequest} visible={props.visible}>
            <View style={styles.centeredView}>
                <Heading
                    label="Request the user?"
                    labelStyle={styles.headingLabel}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Confirm"
                        onPress={onConfirm}
                        containerStyle={{
                            ...styles.buttonContainerStyle,
                            backgroundColor: "black",
                        }}
                        labelStyle={styles.buttonText}
                        androidRippleColor="#505050"
                    />
                    <Button
                        label="Cancel"
                        onPress={props.onCancelRequest}
                        containerStyle={styles.buttonContainerStyle}
                        androidRippleColor="#d9d9d9"
                    />
                </View>
            </View>
        </DailogBox>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
    },
    headingLabel: {
        fontSize: 28,
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
    buttonText: {
        color: "white",
    },
});

function mapState(state: RootState): ConfirmRequestDailogStateProps {
    const reqConfirmDailogState = state.appConfig.requestConfiirmDailog;
    const user = state.user;
    return {
        visible: reqConfirmDailogState.visible,
        receiverId: reqConfirmDailogState.userId ?? "",
        productId: reqConfirmDailogState.productId ?? "",
        tradeId: reqConfirmDailogState.tradeId ?? "",
        token: user.token ?? "",
        sentTradeRequests: user.requests?.sent ?? [],
    };
}

function mapDispatch(dispatch: Dispatch): ConfirmRequestDailogDispatchProps {
    return {
        onCancelRequest: () => {
            dispatch(onCloseRequestConfirmDailog());
        },
        onConfirmRequest: (
            receiverId: string,
            productId: string,
            tradeId: string,
            token: string
        ) => {
            dispatch(
                sendTradeRequests({ receiverId, productId, tradeId, token })
            );
        },
    };
}

export default connect(mapState, mapDispatch)(ConfirmRequestDailog);
