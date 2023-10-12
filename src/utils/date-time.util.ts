import * as dayjs from "dayjs";
import * as Utc from "dayjs/plugin/utc";

dayjs.extend(Utc)

export const utilCurrentDate = () => {
    return dayjs().add(6, 'hours').format()
}

export const utilAddDayToDate = (date: Date | string, days: number) => {
    return dayjs(date).add(days, 'hour').format();
}

export const utilAddTimeToDate = (date: Date | string, time: number, timeType: dayjs.ManipulateType) => {
    return dayjs(date).add(time, timeType).format();
}

export const utilSubtractTimeToDate = (date: Date | string, time: number, timeType: dayjs.ManipulateType) => {
    return dayjs(date).subtract(time, timeType).format();
}
