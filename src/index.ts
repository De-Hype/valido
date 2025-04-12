import { StringSchema } from "./validators/string";
import { NumberSchema } from "./validators/number";
import { BooleanSchema } from "./validators/boolean";
import { DateSchema } from "./validators/date";
import { ArraySchema } from "./validators/array";
import { ObjectSchema } from "./validators/object";
import { UnionSchema } from "./validators/union";
import { AnySchema } from "./validators/any";
import { Schema } from "./schema";
import { ValidationResult } from "./types";

export { ValidoError } from "./errors";
export { Schema };
export type { ValidationResult };

export const v = {
  string: () => new StringSchema(),
  number: () => new NumberSchema(),
  boolean: () => new BooleanSchema(),
  date: () => new DateSchema(),
  array: <T>(schema: Schema<T>) => new ArraySchema<T>(schema),
  object: <T extends Record<string, Schema<any>>>(shape: T) =>
    new ObjectSchema<T>(shape),
  union: <T>(schemas: Schema<T>[]) => new UnionSchema<T>(schemas),
  any: () => new AnySchema(),
};

export default v;
