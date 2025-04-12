import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";
import { isObject } from "../utils";

type SchemaRecord = Record<string, Schema<any>>;

export class ObjectSchema<T extends SchemaRecord> extends Schema<{
  [K in keyof T]: ReturnType<T[K]["parse"]>;
}> {
  private _shape: T;
  private _strict: boolean = false;

  constructor(shape: T) {
    super();
    this._shape = shape;
  }

  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<{ [K in keyof T]: ReturnType<T[K]["parse"]> }> {
    if (!isObject(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected object, received ${typeof value}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._strict) {
      const extraKeys = Object.keys(value).filter((key) => !this._shape[key]);
      if (extraKeys.length > 0) {
        return {
          success: false,
          error: {
            path: context.path,
            message: `Unrecognized keys: ${extraKeys.join(", ")}`,
            originalValue: context.originalValue,
          },
        };
      }
    }

    const result: Record<string, any> = {};

    for (const [key, schema] of Object.entries(this._shape)) {
      const propValue = (value as Record<string, unknown>)[key];
      const propContext: ValidationContext = {
        path: [...context.path, key],
        originalValue: propValue,
      };

      const propResult = schema._validate(propValue, propContext);

      if (!propResult.success) {
        return {
          success: false,
          error: propResult.error,
        };
      }

      result[key] = propResult.value;
    }

    return {
      success: true,
      value: result as { [K in keyof T]: ReturnType<T[K]["parse"]> },
    };
  }

  strict(isStrict: boolean = true): ObjectSchema<T> {
    this._strict = isStrict;
    return this;
  }
}
