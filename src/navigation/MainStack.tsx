import React from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    DetailsScreenRouteProp,
    RootStackParamList,
} from "../schema/ReactNavigation";
import ProductDetails from "../screens/products/ProductDetails";
import Home from "./Home";
import CreateProduct from "../screens/products/CreateProduct";
import CreateTrade from "../screens/products/CreateTrade";
import NewsDetails from "../screens/news/NewsDetails";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "../components/common/IconButton";
import { connect } from "react-redux";
import logoutHandler from "../actions/auth/logoutHandler";
import Label from "../components/common/Label";
import color from "../colorPalette";
import { Dispatch, RootState } from "../store/store";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface MainStackStateProps {
    userName: string;
}

interface MainStackDispatchProps {
    logout: () => void;
}

function MainStack(props: MainStackStateProps & MainStackDispatchProps) {
    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: styles.contentBackground,
                animation: "slide_from_right",
                statusBarStyle: "light",
                statusBarColor: "black",
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: () => (
                        <Label
                            label={`Hey ${props.userName}`}
                            labelStyle={styles.titleStyle}
                            containerStyle={styles.titleContainer}
                        />
                    ),
                    headerRight: () => (
                        <IconButton
                            onPress={props.logout}
                            containerStyle={styles.logoutButtonContainer}
                            androidRippleColor={color.dark100}
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcons
                                    name="logout"
                                    size={28}
                                    color={color.dark800}
                                />
                            </View>
                        </IconButton>
                    ),
                }}
            />
            <Stack.Screen
                name="Details"
                component={ProductDetails}
                options={({ route }: { route: DetailsScreenRouteProp }) => ({
                    headerTitle: () => (
                        <Label
                            label={route.params.name}
                            labelStyle={styles.titleStyle}
                            containerStyle={styles.titleContainer}
                        />
                    ),
                    contentStyle: { ...styles.contentBackground, marginTop: 0 },
                })}
            />
            <Stack.Screen
                name="CreateProduct"
                component={CreateProduct}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CreateTrade"
                component={CreateTrade}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="NewsDetails"
                component={NewsDetails}
                options={{
                    headerTitle: () => (
                        <Label
                            label={"Article"}
                            labelStyle={styles.titleStyle}
                            containerStyle={styles.titleContainer}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: "Lora",
        fontSize: 20,
        fontWeight: "400",
    },
    titleContainer: {
        maxWidth: 250,
    },
    contentBackground: {
        backgroundColor: "white",
    },
    logoutButtonContainer: {
        marginHorizontal: 4,
        borderRadius: 8,
        elevation: 0,
    },
    iconContainer: {
        padding: 6,
    },
});

function mapState(state: RootState): MainStackStateProps {
    return {
        userName: state.user.name ?? "",
    };
}

function mapDispatch(dispatch: Dispatch): MainStackDispatchProps {
    return {
        logout: () => {
            logoutHandler(dispatch);
        },
    };
}

export default connect(mapState, mapDispatch)(MainStack);
