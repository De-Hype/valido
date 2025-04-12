import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class BooleanSchema extends Schema<boolean> {
  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<boolean> {
    if (typeof value !== "boolean") {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected boolean, received ${typeof value}`,
          originalValue: context.originalValue,
        },
      };
    }

    return {
      success: true,
      value,
    };
  }
}
