import { View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../../components/common/LoadingOverlay";
import SignUpForm from "../../components/signUp/SignUpForm";

interface SignUpStateProps {
    isSigningUp: boolean;
}

function SignUp(props: SignUpStateProps) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {props.isSigningUp ? (
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
        isSigningUp: user.isSigningUp,
    };
}

export default connect(mapState)(SignUp);
