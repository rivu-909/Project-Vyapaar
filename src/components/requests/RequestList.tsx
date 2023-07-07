import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import IUserRequests from "../../schema/user/IUserRequests";
import Label from "../common/Label";
import ConnectionDailog from "../dailogs/ConnectionDailog";
import RequestCard from "./RequestCard";

interface RequestListProps {
    requests: IUserRequests;
}

export default function RequestList(props: RequestListProps) {
    const renderHeading = (label: string) => {
        return (
            <Label
                label={label}
                labelStyle={styles.headingStyle}
                containerStyle={[
                    styles.headingContainer,
                    label === "SENT" &&
                        props.requests.received.length !== 0 && {
                            marginTop: 8,
                        },
                ]}
            />
        );
    };

    return (
        <>
            <ScrollView>
                <View style={styles.root}>
                    {props.requests.received.length !== 0
                        ? renderHeading("RECEIVED")
                        : null}
                    {props.requests.received.map((r) => (
                        <RequestCard request={r} key={r._id} received={true} />
                    ))}
                    {props.requests.sent.length !== 0
                        ? renderHeading("SENT")
                        : null}
                    {props.requests.sent.map((r) => (
                        <RequestCard request={r} key={r._id} received={false} />
                    ))}
                </View>
            </ScrollView>
            <ConnectionDailog />
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    headingContainer: {
        alignItems: "center",
        margin: 0,
        marginBottom: 8,
    },
    headingStyle: {
        fontSize: 16,
    },
});
