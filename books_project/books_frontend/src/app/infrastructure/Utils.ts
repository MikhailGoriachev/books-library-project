import { format, parseISO, addDays, isSameDay, startOfDay, endOfDay } from 'date-fns';

export class Utils {
    static removeUndefinedAndEmptyFields(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === undefined || obj[key] === '') {
                delete obj[key];
            }
        }
        return obj;
    }

    static getDatesInRange(startDate: Date, endDate: Date) {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }

        return dates;
    }
}
