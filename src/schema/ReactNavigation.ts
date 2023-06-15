import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Product from "./products/Product";

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
    AllProducts: undefined;
    Details: {
        productId: string;
        name: string;
    };
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export type SignUpScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "SignUp"
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
