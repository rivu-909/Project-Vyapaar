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
import { useDispatch } from "react-redux";
import logoutHandler from "../actions/auth/logoutHandler";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function UserHomeStack() {
    const dispatch = useDispatch();
    const logout = React.useCallback(() => {
        logoutHandler(dispatch);
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: {
                    ...styles.contentBackground,
                },
                animation: "slide_from_right",
                statusBarStyle: "light",
                statusBarColor: "black",
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitle: "",
                    headerRight: (props) => (
                        <IconButton
                            onPress={logout}
                            containerStyle={styles.logoutButtonContainer}
                            androidRippleColor="#d5d5d5"
                        >
                            <View style={styles.iconContainer}>
                                <MaterialIcons
                                    name="logout"
                                    size={28}
                                    color="black"
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
                    title: route.params.name,
                    headerTitleStyle: styles.detailsTitle,
                    headerTitleAlign: "center",
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
                    title: "Article",
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    detailsTitle: {
        fontFamily: "MerriweatherRegular",
        fontSize: 28,
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
