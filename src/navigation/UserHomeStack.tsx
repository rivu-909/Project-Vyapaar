import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    DetailsScreenRouteProp,
    RootStackParamList,
} from "../schema/ReactNavigation";
import ProductDetails from "../screens/products/ProductDetails";
import Home from "./Home";
import CreateProduct from "../screens/products/CreateProduct";
import CreateTrade from "../screens/products/CreateTrade";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function UserHomeStack() {
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
                    headerShown: false,
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
});
