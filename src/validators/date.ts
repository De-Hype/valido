import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";
import { isDate } from "../utils";

export class DateSchema extends Schema<Date> {
  private _min?: Date;
  private _max?: Date;

  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<Date> {
    if (!isDate(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Expected a valid Date object",
          originalValue: context.originalValue,
        },
      };
    }

    if (this._min && value < this._min) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Date must be after ${this._min.toISOString()}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._max && value > this._max) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Date must be before ${this._max.toISOString()}`,
          originalValue: context.originalValue,
        },
      };
    }

    return {
      success: true,
      value,
    };
  }

  min(date: Date): DateSchema {
    this._min = date;
    return this;
  }

  max(date: Date): DateSchema {
    this._max = date;
    return this;
  }
}
