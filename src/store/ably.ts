import Ably from "ably";
import { serverUrl } from "../constants";
import LoadingState from "../schema/LoadingState";

let ably: Ably.Realtime;
let channel: Ably.Types.RealtimeChannelCallbacks;

let connectionState: LoadingState = LoadingState.Idle;

let publishCallStack: {
    event: string;
    data: any;
}[] = [];
let subscribeCallStack: {
    event: string;
    callback: (msg: Ably.Types.Message) => void;
}[] = [];

let retryCount = 1;
const maxRetryCount = 3;

function configureAbly(token: string) {
    ably = new Ably.Realtime({
        authUrl: `${serverUrl}/ably/auth`,
        authHeaders: { Authorization: token },
        autoConnect: false,
    });
    connectionState = LoadingState.Pending;
    ably.connect();
    ably.connection.on("connected", () => {
        connectionState = LoadingState.Success;
        channel = ably.channels.get("test");
        subscribeCallStack.forEach((call) => {
            channel.subscribe(call.event, call.callback);
        });
        publishCallStack.forEach((call) => {
            channel.publish(call.event, call.data);
        });
    });
    ably.connection.on("disconnected", () => {
        connectionState = LoadingState.Failed;
        retryCount++;
        if (retryCount > maxRetryCount) {
            ably.close();
        }
    });
}

export async function subscribe(
    token: string,
    event: string,
    callback: (msg: Ably.Types.Message) => void
) {
    if (connectionState === LoadingState.Idle) {
        subscribeCallStack.push({ event, callback });
        configureAbly(token);
    } else if (connectionState === LoadingState.Pending) {
        subscribeCallStack.push({ event, callback });
    } else if (connectionState === LoadingState.Success) {
        channel?.subscribe(event, callback);
    }
}

export async function publish(token: string, event: string, data: any) {
    if (connectionState === LoadingState.Idle) {
        publishCallStack.push({ event, data });
        configureAbly(token);
    } else if (connectionState === LoadingState.Pending) {
        publishCallStack.push({ event, data });
    } else if (connectionState === LoadingState.Success) {
        channel?.publish(event, data);
    }
}
