﻿export class Utils {
    static removeUndefinedAndEmptyFields(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === undefined || obj[key] === '') {
                delete obj[key];
            }
        }
        return obj;
    }

}