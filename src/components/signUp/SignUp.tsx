import { connect } from "react-redux";
import { RootState } from "../../store/store";
import LoadingOverlay from "../common/LoadingOverlay";
import SignUpForm from "./SignUpForm";

interface SignUpStateProps {
    isSigningUp: boolean;
}

function SignUp(props: SignUpStateProps) {
    return props.isSigningUp ? (
        <LoadingOverlay message="Signing you up..." />
    ) : (
        <SignUpForm />
    );
}

function mapState(state: RootState): SignUpStateProps {
    const user = state.user;
    return {
        isSigningUp: user.isSigningUp,
    };
}

export default connect(mapState)(SignUp);
