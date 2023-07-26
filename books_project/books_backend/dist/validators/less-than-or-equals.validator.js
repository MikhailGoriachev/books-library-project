"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessThanOrEqualsValidator = void 0;
const class_validator_1 = require("class-validator");
let LessThanOrEqualsValidator = exports.LessThanOrEqualsValidator = class LessThanOrEqualsValidator {
    validate(value, validationArguments) {
        const [relatedPropertyName] = validationArguments.constraints;
        const relatedValue = validationArguments.object[relatedPropertyName];
        return value !== undefined && relatedValue !== undefined && value > relatedValue;
    }
    defaultMessage(validationArguments) {
        const [relatedPropertyName] = validationArguments.constraints;
        return `${relatedPropertyName} must be less than or equal to ${relatedPropertyName}`;
    }
};
exports.LessThanOrEqualsValidator = LessThanOrEqualsValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'LessThanOrEqual', async: false })
], LessThanOrEqualsValidator);
//# sourceMappingURL=less-than-or-equals.validator.js.map