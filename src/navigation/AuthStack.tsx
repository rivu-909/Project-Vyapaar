import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../schema/ReactNavigation";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import Welcome from "../screens/welcome/Welcome";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                statusBarStyle: "light",
                statusBarColor: "black",
                contentStyle: { backgroundColor: "white" },
            }}
        >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
}
