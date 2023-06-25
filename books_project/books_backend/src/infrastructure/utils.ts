import { Between, FindOperator, Like } from 'typeorm';

export function getLike(value?: string): FindOperator<string> | undefined {
    return value ? Like(value + '%') : undefined;
}

export function getBetween(a?: number, b?: number): FindOperator<number> | undefined {
    return a !== undefined && b !== undefined ? Between(a, b) : undefined;
}

export function getDateBetween(a?: Date, b?: Date): FindOperator<Date> | undefined {
    return a !== undefined && b !== undefined ? Between(a, b) : undefined;
}

export function parseBoolean(value?: string): boolean | undefined {
    return value === undefined ? undefined : value == 'true';
}