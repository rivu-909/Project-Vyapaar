import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { onCloseConnectionDailog } from "../../store/reducer/appConfig/appConfigSlice";
import { Dispatch, RootState } from "../../store/store";
import Button from "../common/Button";
import DailogBox from "../common/DailogBox";
import Label from "../common/Label";
import { MaterialIcons } from "@expo/vector-icons";
import Address from "../../schema/Address";
import color from "../../colorPalette";

interface ConnectiontDailogStateProps {
    visible: boolean;
    userName: string;
    phoneNumber: string;
    address: Address | null;
}

interface ConnectiontDailogDispatchProps {
    onExit: () => void;
}

function ConnectiontDailog(
    props: ConnectiontDailogStateProps & ConnectiontDailogDispatchProps
) {
    return (
        <DailogBox onClose={props.onExit} visible={props.visible}>
            <View style={styles.centeredView}>
                <Label
                    label="Contact details"
                    labelStyle={styles.headingLabel}
                    containerStyle={styles.headingContainer}
                />
                <View style={styles.descriptionContainer}>
                    <MaterialIcons name="person" size={24} color="black" />
                    <Label
                        label={`${props.userName}`}
                        labelStyle={styles.descriptionLabel}
                        containerStyle={styles.descriptionLabelContainer}
                    />
                </View>
                <View style={styles.descriptionContainer}>
                    <MaterialIcons name="phone" size={24} color="black" />

                    <Label
                        label={`${props.phoneNumber}`}
                        labelStyle={styles.descriptionLabel}
                        containerStyle={styles.descriptionLabelContainer}
                    />
                </View>
                {props.address && (
                    <View style={styles.descriptionContainer}>
                        <MaterialIcons
                            name="location-pin"
                            size={24}
                            color="black"
                        />

                        <View style={styles.addressContainer}>
                            <Label
                                label={`${props.address.firstLine}`}
                                labelStyle={styles.descriptionLabel}
                                containerStyle={
                                    styles.descriptionLabelContainer
                                }
                            />
                            {props.address.secondLine && (
                                <Label
                                    label={`${props.address.secondLine}`}
                                    labelStyle={styles.descriptionLabel}
                                    containerStyle={
                                        styles.descriptionLabelContainer
                                    }
                                />
                            )}
                            <Label
                                label={`${props.address.district}, ${props.address.state}, ${props.address.pincode}`}
                                labelStyle={styles.descriptionLabel}
                                containerStyle={
                                    styles.descriptionLabelContainer
                                }
                            />
                        </View>
                    </View>
                )}

                <View style={styles.buttonsContainer}>
                    <Button
                        label="Okay"
                        onPress={props.onExit}
                        containerStyle={styles.buttonContainerStyle}
                        labelStyle={styles.buttonText}
                        androidRippleColor={color.theme1000}
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
    descriptionContainer: {
        flexDirection: "row",
        marginBottom: 4,
    },
    headingContainer: {
        marginBottom: 16,
    },
    headingLabel: {
        fontSize: 24,
    },
    descriptionLabel: {
        fontSize: 16,
        marginLeft: 8,
    },
    descriptionLabelContainer: {
        marginVertical: 0,
        marginBottom: 4,
    },
    buttonsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginRight: 20,
    },
    addressContainer: {},
    buttonContainerStyle: {
        borderRadius: 8,
        backgroundColor: color.theme400,
        minWidth: 150,
    },
    buttonText: {
        color: "white",
    },
});

function mapState(state: RootState): ConnectiontDailogStateProps {
    const connectionDailog = state.appConfig.connectionDailog;
    return {
        visible: connectionDailog.visible,
        userName: connectionDailog.userName ?? "",
        phoneNumber: connectionDailog.phoneNumber ?? "",
        address: connectionDailog.address,
    };
}

function mapDispatch(dispatch: Dispatch): ConnectiontDailogDispatchProps {
    return {
        onExit: () => {
            dispatch(onCloseConnectionDailog());
        },
    };
}

export default connect(mapState, mapDispatch)(ConnectiontDailog);
