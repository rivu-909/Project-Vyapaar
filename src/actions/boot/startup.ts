import LoadingState from "../../schema/LoadingState";
import { setBootState } from "../../store/reducer/user/userSlice";
import { Dispatch } from "../../store/store";
import retrieveUserData from "./retrieveUserData";
import retrieveUserToken from "./retrieveUserToken";

export default function startUp(dispatch: Dispatch) {
    dispatch(setBootState(LoadingState.pending));
    retrieveUserData(dispatch);
    retrieveUserToken(dispatch);
    dispatch(setBootState(LoadingState.success));
}
