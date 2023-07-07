import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import sendTradeRequests from "../../actions/requests/sendTradeRequest";
import color from "../../colorPalette";
import ITradeRequest from "../../schema/user/ITradeRequest";
import { onCloseRequestConfirmDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Label from "../common/Label";

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
                <Label
                    label="Send trade request?"
                    labelStyle={styles.headingLabel}
                    containerStyle={styles.headingContainer}
                />
                <View style={styles.buttonsContainer}>
                    <Button
                        label="Confirm"
                        onPress={onConfirm}
                        containerStyle={{
                            ...styles.buttonContainerStyle,
                            backgroundColor: color.theme400,
                        }}
                        labelStyle={styles.buttonText}
                        androidRippleColor={color.theme1000}
                    />
                    <Button
                        label="Cancel"
                        onPress={props.onCancelRequest}
                        containerStyle={styles.buttonContainerStyle}
                        androidRippleColor={color.dark100}
                    />
                </View>
            </View>
        </DailogBox>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        width: "95%",
        justifyContent: "center",
        backgroundColor: color.theme100,
        borderRadius: 20,
        padding: 16,
        paddingLeft: 24,
    },
    headingLabel: {
        fontSize: 24,
    },
    headingContainer: {
        marginVertical: 16,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    buttonContainerStyle: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: color.dark50,
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
