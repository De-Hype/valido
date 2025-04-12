import { Schema } from "../schema";
import { ValidationContext, ValidationResult } from "../types";

export class StringSchema extends Schema<string> {
  private _minLength?: number;
  private _maxLength?: number;
  private _pattern?: RegExp;
  private _email?: boolean;
  private _url?: boolean;
  private _uuid?: boolean;

  _validate(
    value: unknown,
    context: ValidationContext
  ): ValidationResult<string> {
    if (typeof value !== "string") {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected string, received ${typeof value}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._minLength !== undefined && value.length < this._minLength) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `String must be at least ${this._minLength} characters`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._maxLength !== undefined && value.length > this._maxLength) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `String must not exceed ${this._maxLength} characters`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._pattern !== undefined && !this._pattern.test(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `String must match pattern ${this._pattern}`,
          originalValue: context.originalValue,
        },
      };
    }

    if (this._email && !this._validateEmail(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Invalid email address",
          originalValue: context.originalValue,
        },
      };
    }

    if (this._url && !this._validateUrl(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Invalid URL",
          originalValue: context.originalValue,
        },
      };
    }

    if (this._uuid && !this._validateUuid(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: "Invalid UUID",
          originalValue: context.originalValue,
        },
      };
    }

    return {
      success: true,
      value,
    };
  }

  minLength(length: number): StringSchema {
    this._minLength = length;
    return this;
  }

  maxLength(length: number): StringSchema {
    this._maxLength = length;
    return this;
  }

  pattern(regex: RegExp): StringSchema {
    this._pattern = regex;
    return this;
  }

  email(): StringSchema {
    this._email = true;
    return this;
  }

  url(): StringSchema {
    this._url = true;
    return this;
  }

  uuid(): StringSchema {
    this._uuid = true;
    return this;
  }

  private _validateEmail(value: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  }

  private _validateUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  private _validateUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    );
  }
}
