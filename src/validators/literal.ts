import { Schema } from '../schema';
import { ValidationContext, ValidationResult } from '../types';

export class LiteralSchema<T extends string | number | boolean> extends Schema<T> {
  private _value: T;

  constructor(value: T) {
    super();
    this._value = value;
  }

  _validate(value: unknown, context: ValidationContext): ValidationResult<T> {
    if (value !== this._value) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected ${JSON.stringify(this._value)}, received ${JSON.stringify(value)}`,
          originalValue: context.originalValue
        }
      };
    }

    return {
      success: true,
      value: this._value
    };
  }
}
