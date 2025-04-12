//@ts-nocheck
import { v } from "../src";

describe("UnionSchema", () => {
  test("validates union types", () => {
   
    const schema = v.union([v.string(), v.number()]);

    expect(schema.parse("hello")).toBe("hello");
    expect(schema.parse(123)).toBe(123);
    expect(() => schema.parse(true)).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("complex union validation", () => {
    const schema = v.union([
      v.object({ type: v.string().pattern(/^string$/), value: v.string() }),
      v.object({ type: v.string().pattern(/^number$/), value: v.number() }),
    ]);

    expect(schema.parse({ type: "string", value: "hello" })).toEqual({
      type: "string",
      value: "hello",
    });
    expect(schema.parse({ type: "number", value: 123 })).toEqual({
      type: "number",
      value: 123,
    });
    expect(() => schema.parse({ type: "string", value: 123 })).toThrow();
    expect(() => schema.parse({ type: "number", value: "hello" })).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.union([v.string(), v.number()]);

    expect(schema.safeParse("hello").success).toBe(true);
    expect(schema.safeParse(123).success).toBe(true);
    expect(schema.safeParse(true).success).toBe(false);
  });
});
