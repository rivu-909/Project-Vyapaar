import LoadingState from "../LoadingState";
import IConnectionDailog from "./IConnectionDailog";
import IRequestConfirmDailogConfig from "./IRequestConfiirmDailogConfig";

export default interface AppConfigState {
    requestConfiirmDailog: IRequestConfirmDailogConfig;
    connectionDailog: IConnectionDailog;
    bootState: LoadingState;
}
