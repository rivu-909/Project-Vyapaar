import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Product from "./products/Product";

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    SignUp: undefined;
    UserHome: undefined;
    Details: {
        product: Product;
    };
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export type WelcomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Welcome"
>;

export type DetailsScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Details"
>;

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;
