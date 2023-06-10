import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import SignUpForm from "../../components/signUp/SignUpForm";
import LoadingState from "../../schema/LoadingState";

interface SignUpStateProps {
    signUpState: LoadingState;
}

function SignUp(props: SignUpStateProps) {
    return (
        <View style={styles.root}>
            {props.signUpState === LoadingState.pending ? (
                <LoadingOverlay message="Signing you up..." />
            ) : (
                <SignUpForm />
            )}
        </View>
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
        alignItems: "center",
        justifyContent: "center",
    },
});

export default connect(mapState)(SignUp);
