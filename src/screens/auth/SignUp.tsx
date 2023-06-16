import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import SignUpForm from "../../components/signUp/SignUpForm";
import LoadingState from "../../schema/LoadingState";
import { SignUpScreenNavigationProp } from "../../schema/ReactNavigation";
import Button from "../../components/common/Button";

interface SignUpProps {
    navigation: SignUpScreenNavigationProp;
}

interface SignUpStateProps {
    signUpState: LoadingState;
}

function SignUp(props: SignUpProps & SignUpStateProps) {
    const goToLoginPage = () => {
        props.navigation.navigate("Login");
    };
    return (
        <ScrollView
            style={styles.root}
            contentContainerStyle={styles.contentStyle}
        >
            {props.signUpState == LoadingState.pending ? (
                <LoadingOverlay message="Signing you up..." />
            ) : (
                <>
                    <SignUpForm />
                    <Button
                        onPress={goToLoginPage}
                        label="Use an existing account"
                        containerStyle={styles.buttonContainerStyle}
                    />
                </>
            )}
        </ScrollView>
    );
}

function mapState(state: RootState): SignUpStateProps {
    const user = state.user;
    return {
        signUpState: user.signUpState,
    };
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    contentStyle: {
        flexGrow: 1,
        marginLeft: 20,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    buttonContainerStyle: {
        marginLeft: 12,
        borderRadius: 8,
        backgroundColor: "#D3D3D3",
    },
});

export default connect(mapState)(SignUp);
