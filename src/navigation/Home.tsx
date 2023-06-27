import { StyleSheet } from "react-native";
import AllProducts from "../screens/products/AllProducts";
import News from "../screens/news/News";
import Requests from "../screens/requests/Requests";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: "white" }}
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: {
                    fontFamily: "MerriweatherRegular",
                    fontSize: 14,
                },
                tabBarActiveBackgroundColor: "#d3d3d3",
                tabBarActiveTintColor: "black",
                tabBarInactiveTintColor: "#707070",
                tabBarStyle: {
                    height: 64,
                },
                tabBarItemStyle: {
                    borderRadius: 8,
                    padding: 4,
                    margin: 4,
                },
            }}
        >
            <Tab.Screen
                name="All"
                component={AllProducts}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="News"
                component={News}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5
                            name="newspaper"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Requests"
                component={Requests}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="users" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontFamily: "MerriweatherRegular",
        fontSize: 16,
    },
});
