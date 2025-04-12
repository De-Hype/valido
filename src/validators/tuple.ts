import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class TupleSchema<T extends Schema<any>[]> extends Schema<{
  [K in keyof T]: T[K] extends Schema<infer U> ? U : never;
}> {
  private _schemas: T;

  constructor(schemas: T) {
    super();
    this._schemas = schemas;
  }

  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<{
    [K in keyof T]: T[K] extends Schema<infer U> ? U : never;
  }> {
    if (!Array.isArray(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected array, received ${typeof value}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (value.length !== this._schemas.length) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected tuple of length ${this._schemas.length}, received length ${value.length}`,
          originalValue: context.originalValue,
        },
      };
    }

    const result: any[] = [];

    for (let i = 0; i < this._schemas.length; i++) {
      const schema = this._schemas[i];
      const itemContext: ValidationContext = {
        path: [...context.path, i.toString()],
        originalValue: value[i],
      };

      const itemResult = schema._validate(value[i], itemContext);

      if (!itemResult.success) {
        return {
          success: false,
          error: itemResult.error,
        };
      }

      result.push(itemResult.value);
    }

    return {
      success: true,
      value: result as {
        [K in keyof T]: T[K] extends Schema<infer U> ? U : never;
      },
    };
  }
}
