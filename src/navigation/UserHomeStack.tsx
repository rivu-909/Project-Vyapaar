import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../schema/ReactNavigation";
import ProductDetails from "../screens/products/ProductDetails";
import UserHome from "../screens/userHome/UserHome";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function UserHomeStack() {
    return (
        <Stack.Navigator
        // screenOptions={{
        //     headerShown: false,
        //     contentStyle: { backgroundColor: "white" }, // very important
        // }}
        >
            <Stack.Screen name="UserHome" component={UserHome} />
            <Stack.Screen name="Details" component={ProductDetails} />
        </Stack.Navigator>
    );
}
