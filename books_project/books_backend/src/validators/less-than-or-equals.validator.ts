import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'LessThanOrEqual', async: false })
export class LessThanOrEqualsValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        const [relatedPropertyName] = validationArguments.constraints;
        const relatedValue = (validationArguments.object as any)[relatedPropertyName];

        return value !== undefined && relatedValue !== undefined && value > relatedValue;
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        const [relatedPropertyName] = validationArguments.constraints;
        return `${relatedPropertyName} must be less than or equal to ${relatedPropertyName}`;
    }
}
