import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHome from "../screens/userHome/UserHome";

const Stack = createNativeStackNavigator();

export default function UserHomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="User Home" component={UserHome} />
        </Stack.Navigator>
    );
}
