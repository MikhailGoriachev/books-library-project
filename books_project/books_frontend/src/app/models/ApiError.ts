﻿export class ApiError {
    constructor(public statusCode: number,
                public message: string,
                public timestamp?: string,
                public path?: string) {}
}
