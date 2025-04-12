import { StringSchema } from './validators/string';
import { NumberSchema } from './validators/number';
import { BooleanSchema } from './validators/boolean';
import { DateSchema } from './validators/date';
import { ArraySchema } from './validators/array';
import { ObjectSchema } from './validators/object';
import { UnionSchema } from './validators/union';
import { AnySchema } from './validators/any';
import { LiteralSchema } from './validators/literal';
import { TupleSchema } from './validators/tuple';
import { RecordSchema } from './validators/record';
import { Schema } from './schema';
import { ValidationResult } from './types';

export { ValidoError } from './errors';
export { Schema };
export type { ValidationResult };

export const v = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  date: () => new DateSchema(),
  array: <T>(schema: Schema<T>) => new ArraySchema<T>(schema),
  object: <T extends Record<string, Schema<any>>>(shape: T) => new ObjectSchema<T>(shape),
  union: <T>(schemas: Schema<T>[]) => new UnionSchema<T>(schemas),
  any: () => new AnySchema(),
  literal: <T extends string | number | boolean>(value: T) => new LiteralSchema<T>(value),
  tuple: <T extends Schema<any>[]>(schemas: T) => new TupleSchema<T>(schemas),
  record: <K extends string, V>(keySchema: Schema<K>, valueSchema: Schema<V>) => new RecordSchema<K, V>(keySchema, valueSchema)
};

export default v;
