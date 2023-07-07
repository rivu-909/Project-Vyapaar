export default function getFormattedDate(date: Date) {
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return formattedDate;
}
