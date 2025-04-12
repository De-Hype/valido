import { v } from "../src";

describe("TupleSchema", () => {
  test("validates tuples", () => {
    const schema = v.tuple([v.string(), v.number(), v.boolean()]);

    expect(schema.parse(["hello", 42, true])).toEqual(["hello", 42, true]);
    expect(() => schema.parse(["hello", "world", true])).toThrow();
    expect(() => schema.parse(["hello", 42])).toThrow(); // too short
    expect(() => schema.parse(["hello", 42, true, "extra"])).toThrow(); // too long
    expect(() => schema.parse(123)).toThrow();
  });

  test("validates nested tuples", () => {
    const schema = v.tuple([v.string(), v.tuple([v.number(), v.boolean()])]);

    expect(schema.parse(["hello", [42, true]])).toEqual(["hello", [42, true]]);
    expect(() => schema.parse(["hello", [42, "true"]])).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.tuple([v.string(), v.number()]);

    expect(schema.safeParse(["hello", 42]).success).toBe(true);
    expect(schema.safeParse(["hello", "world"]).success).toBe(false);
  });
});
