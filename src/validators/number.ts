import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class NumberSchema extends Schema<number> {
  private _min?: number;
  private _max?: number;
  private _integer?: boolean;
  private _positive?: boolean;
  private _negative?: boolean;

  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<number> {
    if (typeof value !== "number" || isNaN(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected number, received ${typeof value}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._min !== undefined && value < this._min) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Number must be at least ${this._min}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._max !== undefined && value > this._max) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Number must not exceed ${this._max}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._integer && !Number.isInteger(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Number must be an integer",
          originalValue: context.originalValue,
        },
      };
    }

    if (this._positive && value <= 0) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Number must be positive",
          originalValue: context.originalValue,
        },
      };
    }

    if (this._negative && value >= 0) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Number must be negative",
          originalValue: context.originalValue,
        },
      };
    }

    return {
      success: true,
      value,
    };
  }

  min(min: number): NumberSchema {
    this._min = min;
    return this;
  }

  max(max: number): NumberSchema {
    this._max = max;
    return this;
  }

  integer(): NumberSchema {
    this._integer = true;
    return this;
  }

  positive(): NumberSchema {
    this._positive = true;
    this._negative = false;
    return this;
  }

  negative(): NumberSchema {
    this._negative = true;
    this._positive = false;
    return this;
  }
}
