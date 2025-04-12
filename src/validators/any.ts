import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class AnySchema extends Schema<any> {
  _validate(value: unknown, context: ValidationContext): ValidationResult<any> {
    return {
      success: true,
      value,
    };
  }
}
