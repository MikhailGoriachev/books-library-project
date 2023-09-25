import { FindOperator } from 'typeorm';
export declare function getLike(value?: string): FindOperator<string> | undefined;
export declare function getLikeForStringWords(line: string): void;
export declare function getBetween(a?: number, b?: number): FindOperator<number> | undefined;
export declare function getDateBetween(a?: Date, b?: Date): FindOperator<Date> | undefined;
export declare function getById(id?: string | number): {
    id: string | number;
};
export declare function getInById(id?: number[]): {
    id: FindOperator<any>;
};
export declare function parseBoolean(value?: string): boolean | undefined;
export declare function transformStringToArrayNumber({ value }: {
    value: any;
}): any[];
export declare function transformStringToArrayString({ value }: {
    value: any;
}): any;
