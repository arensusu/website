
export const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0 ~ 11
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}