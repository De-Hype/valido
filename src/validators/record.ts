import { Schema } from '../schema';
import { ValidationContext, ValidationResult } from '../types';
import { isObject } from '../utils';

export class RecordSchema<K extends string, V> extends Schema<Record<K, V>> {
  private _keySchema: Schema<K>;
  private _valueSchema: Schema<V>;

  constructor(keySchema: Schema<K>, valueSchema: Schema<V>) {
    super();
    this._keySchema = keySchema;
    this._valueSchema = valueSchema;
  }

  _validate(value: unknown, context: ValidationContext): ValidationResult<Record<K, V>> {
    if (!isObject(value)) {
      return {
        success: false,
        error: {
          path: context.path,
          message: `Expected object, received ${typeof value}`,
          originalValue: context.originalValue
        }
      };
    }

    const result: Record<string, V> = {};

    for (const [key, val] of Object.entries(value)) {
      const keyResult = this._keySchema._validate(key, {
        path: [...context.path, `[key: ${key}]`],
        originalValue: key
      });

      if (!keyResult.success) {
        return {
          success: false,
          error: keyResult.error
        };
      }

      // Validate value
      const valueResult = this._valueSchema._validate(val, {
        path: [...context.path, key],
        originalValue: val
      });

      if (!valueResult.success) {
        return {
          success: false,
          error: valueResult.error
        };
      }

      result[key] = valueResult.value as V;
    }

    return {
      success: true,
      value: result as Record<K, V>
    };
  }
}
