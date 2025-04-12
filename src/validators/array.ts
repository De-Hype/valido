import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class ArraySchema<T> extends Schema<T[]> {
  private _itemSchema: Schema<T>;
  private _minLength?: number;
  private _maxLength?: number;

  constructor(itemSchema: Schema<T>) {
    super();
    this._itemSchema = itemSchema;
  }

  _validate(value: unknown, context: ValidationContext): ValidationResult<T[]> {
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

    if (this._minLength !== undefined && value.length < this._minLength) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Array must contain at least ${this._minLength} items`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._maxLength !== undefined && value.length > this._maxLength) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Array must contain at most ${this._maxLength} items`,
          originalValue: context.originalValue,
        },
      };
    }

    const result: T[] = [];

    for (let i = 0; i < value.length; i++) {
      const itemContext: ValidationContext = {
        path: [...context.path, i.toString()],
        originalValue: value[i],
      };

      const itemResult = this._itemSchema._validate(value[i], itemContext);

      if (!itemResult.success) {
        return {
          success: false,
          error: itemResult.error,
        };
      }

      result.push(itemResult.value as T);
    }

    return {
      success: true,
      value: result,
    };
  }

  minLength(length: number): ArraySchema<T> {
    this._minLength = length;
    return this;
  }

  maxLength(length: number): ArraySchema<T> {
    this._maxLength = length;
    return this;
  }
}
