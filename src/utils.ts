export function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
  
  export function isDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
  }