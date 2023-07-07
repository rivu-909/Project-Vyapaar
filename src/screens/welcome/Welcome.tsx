import React from "react";
import {
    GestureResponderEvent,
    StyleSheet,
    Text,
    View,
    Image,
} from "react-native";
import color from "../../colorPalette";
import Button from "../../components/common/Button";
import Label from "../../components/common/Label";
import { WelcomeScreenNavigationProp } from "../../schema/ReactNavigation";

interface WelcomeNavigationProps {
    navigation: WelcomeScreenNavigationProp;
}

export default function Welcome(props: WelcomeNavigationProps) {
    const goToLoginPage = (evt: GestureResponderEvent) => {
        evt.stopPropagation();
        props.navigation.navigate("Login");
    };
    return (
        <View style={styles.root}>
            <View style={styles.headingContainer}>
                <Label
                    label="Big Vyapaar"
                    labelStyle={styles.headingLabel}
                    containerStyle={{ alignItems: "center" }}
                />
            </View>
            <Text style={styles.sloganLabel}>
                Elevating business needs, {"\n"} one trade at a time.
            </Text>
            <Button
                onPress={goToLoginPage}
                label="Get started..."
                containerStyle={styles.button}
                labelStyle={styles.buttonLabel}
                androidRippleColor={color.theme1000}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headingLabel: {
        fontFamily: "Lobster",
        color: "white",
        fontSize: 48,
        textAlign: "center",
    },
    headingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleImage: {
        height: 60,
        width: 280,
        resizeMode: "stretch",
    },
    sloganLabel: {
        fontFamily: "Lora",
        color: "white",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        marginBottom: 60,
        marginHorizontal: 40,
    },
    button: {
        backgroundColor: color.theme400,
        borderRadius: 8,
    },
    buttonLabel: {
        paddingHorizontal: 20,
        color: "white",
    },
});
