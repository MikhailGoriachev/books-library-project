import { Between, FindOperator, In, Like } from 'typeorm';

export function getLike(value?: string): FindOperator<string> | undefined {
    return value ? Like(value + '%') : undefined;
}

// TODO: получить like для сравнения со словами в строке
export function getLikeForStringWords(line: string) {

}

export function getBetween(a?: number, b?: number): FindOperator<number> | undefined {
    return a !== undefined && b !== undefined ? Between(a, b) : undefined;
}

export function getDateBetween(a?: Date, b?: Date): FindOperator<Date> | undefined {
    return a !== undefined && b !== undefined ? Between(a, b) : undefined;
}

export function getById(id?: string | number) {
    return id !== undefined ? { id } : undefined;
}

export function getInById(id?: number[]) {
    return id !== undefined ? { id: In(id) } : undefined;
}

export function parseBoolean(value?: string): boolean | undefined {
    return value === undefined ? undefined : value == 'true';
}

export function transformStringToArrayNumber({ value }) {
    return typeof(value[0]) === "string"
        ? value[0].split(',').map((v) => +v)
        : value;
}

export function transformStringToArrayString({ value }) {
    return typeof(value[0]) === "string"
        ? value[0].split(',')
        : value;
}