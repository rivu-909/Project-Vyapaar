import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    DetailsScreenRouteProp,
    RootStackParamList,
} from "../schema/ReactNavigation";
import ProductDetails from "../screens/products/ProductDetails";
import Home from "./Home";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function UserHomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    contentStyle: styles.contentBackground,
                }}
            />
            <Stack.Screen
                name="Details"
                component={ProductDetails}
                options={({ route }: { route: DetailsScreenRouteProp }) => ({
                    title: route.params.name,
                    headerTitleStyle: styles.detailsTitle,
                    headerTitleAlign: "center",
                    contentStyle: styles.contentBackground,
                })}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    detailsTitle: {
        fontFamily: "Merriweather",
        fontSize: 28,
    },
    contentBackground: {
        backgroundColor: "white",
    },
});
