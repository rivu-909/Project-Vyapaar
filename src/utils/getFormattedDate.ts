export default function getFormattedDate(date: Date) {
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
    });

    // Format the time
    const formattedTime = new Date(date).toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
    });

    // Combine the date and time
    return formattedTime + " " + formattedDate;
}
