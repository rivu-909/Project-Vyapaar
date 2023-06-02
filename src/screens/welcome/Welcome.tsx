import { NavigationProp } from "@react-navigation/native";
import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import Button from "../../components/common/Button";

interface WelcomeNavigationProps {
    navigation: NavigationProp<any, any>;
}

export default function Welcome(props: WelcomeNavigationProps) {
    const goToLoginPage = (evt: GestureResponderEvent) => {
        evt.stopPropagation();
        props.navigation.navigate("Login");
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Welcome to Vyapaar</Text>
            <Button onPress={goToLoginPage} label="Get started" />
        </View>
    );
}
