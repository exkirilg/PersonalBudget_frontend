export function getCurrentMonthBeginning() : Date {
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
}

export function getCurrentMonthEnd() : Date {
    let today = new Date();
    let nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return new Date(nextMonthStart.setSeconds(nextMonthStart.getSeconds() - 1));
}

export function getDateAsString(date: Date) : string {
    let dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return dateUTC.toISOString().slice(0, 10);
}

export function getDateTimeAsString(date: Date) : string {
    let dateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return dateUTC.toISOString().slice(0, 16);
}

export function getDateBeginning(date: Date) : Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDateEnd(date: Date) : Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
}

export function getDatePresentation(date: Date) : string {
    return date.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
}
