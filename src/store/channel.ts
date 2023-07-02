import Ably from "ably";
import { serverUrl } from "../constants";

export type Channel = Ably.Types.RealtimeChannelCallbacks;

let channel: Channel;

async function configureAbly(token: string): Promise<Channel> {
    const ably = new Ably.Realtime({
        authUrl: `${serverUrl}/ably/auth`,
        authHeaders: { Authorization: token },
        autoConnect: false,
    });
    await ably.connection.once("connected");
    console.log("connected to ably");
    return ably.channels.get("test");
}

export async function getChannel(token: string): Promise<Channel> {
    if (!channel) {
        channel = await configureAbly(token);
    }
    return channel;
}

export async function subscribe(
    token: string,
    event: string,
    callback: (msg: Ably.Types.Message) => void
) {
    channel = await getChannel(token);
    console.log("channel is set");
    channel.subscribe(event, callback);
}

export async function publish(token: string, event: string, data: any) {
    channel = await getChannel(token);
    channel.publish(event, data);
}
