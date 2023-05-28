
export const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0 ~ 11
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}

export const thisMonthStart = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0 ~ 11
    return `${year}-${month.toString().padStart(2, "0")}-01`;
}

export const thisMonthEnd = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0 ~ 11
    const day = new Date(year, month, 0).getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}

export const lastSevenDays = () => {
    const date = new Date(currentDate());
    date.setDate(date.getDate() - 7);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0 ~ 11
    const day = date.getDate();
    
    return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}

export const lastMonthStart = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 ~ 11
    return `${year}-${month.toString().padStart(2, "0")}-01`;
}

export const lastMonthEnd = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 ~ 11
    const day = new Date(year, month, 0).getDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
}