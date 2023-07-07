import { StyleSheet } from "react-native";
import AllProducts from "../screens/products/AllProducts";
import News from "../screens/news/News";
import Requests from "../screens/requests/Requests";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import color from "../colorPalette";

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: "white" }}
            screenOptions={{
                headerShown: false,
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarActiveBackgroundColor: color.theme400,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: color.dark800,
                tabBarStyle: styles.tabBarStyle,
                tabBarItemStyle: styles.tabBarItemStyle,
            }}
        >
            <Tab.Screen
                name="AllProducts"
                component={AllProducts}
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            size={32}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="News"
                component={News}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="newspaper"
                            size={32}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Requests"
                component={Requests}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="group" size={32} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontFamily: "Lora",
        fontSize: 14,
        fontWeight: "500",
    },
    tabBarItemStyle: {
        borderRadius: 12,
        padding: 4,
        margin: 4,
    },
    tabBarStyle: {
        height: 64,
        elevation: 0,
    },
});
