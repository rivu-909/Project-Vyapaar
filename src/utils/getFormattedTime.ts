export default function getFormattedTime(date: Date) {
    const formattedTime = new Date(date).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
    });

    return formattedTime;
}
