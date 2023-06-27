import { ScrollView, StyleSheet } from "react-native";
import SignUpForm from "../../components/signUp/SignUpForm";
import { SignUpScreenNavigationProp } from "../../schema/ReactNavigation";

interface SignUpProps {
    navigation: SignUpScreenNavigationProp;
}

export default function SignUp(props: SignUpProps) {
    const goToLoginPage = () => {
        props.navigation.navigate("Login");
    };
    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
            <SignUpForm goToLoginPage={goToLoginPage} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    contentStyle: {
        flexGrow: 1,
        marginLeft: 20,
        justifyContent: "center",
    },
    buttonContainerStyle: {
        marginLeft: 12,
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
});
