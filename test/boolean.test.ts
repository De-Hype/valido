import { v } from "../src";

describe("BooleanSchema", () => {
  test("validates booleans", () => {
    const schema = v.boolean();
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse(false)).toBe(false);
    expect(() => schema.parse("true")).toThrow();
    expect(() => schema.parse(1)).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.boolean();
    expect(schema.safeParse(true).success).toBe(true);
    expect(schema.safeParse("true").success).toBe(false);
  });
});
