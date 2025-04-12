import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class NullableSchema<T> extends Schema<T | null> {
  private _schema: Schema<T>;

  constructor(schema: Schema<T>) {
    super();
    this._schema = schema;
  }

  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<T | null> {
    if (value === null) {
      return {
        success: true,
        value: null,
      };
    }

    return this._schema._validate(value, context);
  }
}
