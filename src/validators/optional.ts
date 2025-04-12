import { Schema } from '../schema';
import { ValidationContext, ValidationResult } from '../types';

export class OptionalSchema<T> extends Schema<T | undefined> {
  private _schema: Schema<T>;

  constructor(schema: Schema<T>) {
    super();
    this._schema = schema;
  }

  _validate(value: unknown, context: ValidationContext): ValidationResult<T | undefined> {
    if (value === undefined) {
      return {
        success: true,
        value: undefined
      };
    }

    return this._schema._validate(value, context);
  }
}
