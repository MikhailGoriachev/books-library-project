import { Injectable } from '@angular/core';
import { format, parseISO, addDays, isSameDay, startOfDay, endOfDay } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    public parseDateString(dateString: string): Date {
        return parseISO(dateString);
    }

    public addDaysToDate(baseDate: Date, daysToAdd: number): Date {
        return addDays(baseDate, daysToAdd);
    }

    public getYesterday(): Date {
        return addDays(new Date(), -1);
    }

    public toDateString(date: Date, formatDate = 'yyyy-MM-dd'): string {
        return format(date, formatDate);
    }

    public toDateTimeString(date: Date, formatDate = 'yyyy-MM-ddTHH:mm:ss.SSSZ'): string {
        return format(date, formatDate);
    }

    public isDateEquals(a: Date, b: Date) {
        return isSameDay(a, b);
    }

    public getDate(date: Date) {
        return startOfDay(date);
    }

    public getStartOfDay(date: Date) {
        return startOfDay(date);
    }

    public getEndOfDay(date: Date) {
        return endOfDay(date);
    }
}
