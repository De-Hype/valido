import { ValidationContext, ValidationError, ValidationOptions, ValidationResult } from './types';
import { ValidoError } from './errors';

export abstract class Schema<T> {
  abstract _validate(value: unknown, context: ValidationContext): ValidationResult<T>;

  parse(value: unknown, options?: ValidationOptions): T {
    const result = this._validate(value, { path: [], originalValue: value });

    if (!result.success) {
      throw new ValidoError([result.error!]);
    }

    return result.value as T;
  }

  safeParse(value: unknown, options?: ValidationOptions): ValidationResult<T> {
    try {
      const result = this._validate(value, { path: [], originalValue: value });
      return result;
    } catch (error) {
      if (error instanceof ValidoError) {
        return {
          success: false,
          error: error.errors[0]
        };
      }
      throw error;
    }
  }

  optional(): Schema<T | undefined> {
    return new OptionalSchema(this);
  }

  nullable(): Schema<T | null> {
    return new NullableSchema(this);
  }
}

import { OptionalSchema } from './validators/optional';
import { NullableSchema } from './validators/nullable';