import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class UnionSchema<T> extends Schema<T> {
  private _schemas: Schema<any>[];

  constructor(schemas: Schema<any>[]) {
    super();
    this._schemas = schemas;
  }

  _validate(value: unknown, context: ValidationContext): ValidationResult<T> {
    const errors = [];

    for (const schema of this._schemas) {
      const result = schema._validate(value, context);
      if (result.success) {
        return {
          success: true,
          value: result.value as T,
        };
      }
      errors.push(result.error);
    }

    return {
      success: false,
      error: {
        path: context.path,
        message: `Value does not match any schema in union`,
        originalValue: context.originalValue,
      },
    };
  }
}
