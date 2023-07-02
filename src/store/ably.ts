import Ably from "ably";
import { serverUrl } from "../constants";

export type Channel = Ably.Types.RealtimeChannelCallbacks | undefined;

let ably: Ably.Realtime;
let channel: Channel;

async function configureAbly(token: string): Promise<Channel> {
    if (!ably) {
        ably = new Ably.Realtime({
            authUrl: `${serverUrl}/ably/auth`,
            authHeaders: { Authorization: token },
        });
    }
    try {
        await ably.connection.once("connected");
        return ably.channels.get("test");
    } catch (err) {
        console.log(err);
    }
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
    channel?.subscribe(event, callback);
}

export async function publish(token: string, event: string, data: any) {
    channel = await getChannel(token);
    channel?.publish(event, data);
}
