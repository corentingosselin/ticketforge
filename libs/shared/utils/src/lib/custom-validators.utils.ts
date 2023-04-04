import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import { isPasswordSecure } from './regex-utils';

export function IsPasswordSecure(validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPasswordSecureConstraint,
        });
    };
}

@ValidatorConstraint({name: 'IsPasswordSecure'})
export class IsPasswordSecureConstraint implements ValidatorConstraintInterface {

    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return isPasswordSecure(value);
    }

    defaultMessage(validationArguments?: ValidationArguments | undefined): string {
        return 'Password too weak';
    }

}

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${relatedPropertyName} must match`;
    }

}