import { v } from "../src";

describe("OptionalSchema", () => {
  test("validates optional types", () => {
    const schema = v.string().optional();

    expect(schema.parse("hello")).toBe("hello");
    expect(schema.parse(undefined)).toBe(undefined);
    expect(() => schema.parse(123)).toThrow();
    expect(() => schema.parse(null)).toThrow();
  });

  test("complex optional validation", () => {
    const schema = v.object({
      name: v.string(),
      email: v.string().email().optional(),
    });

    expect(schema.parse({ name: "John", email: "john@example.com" })).toEqual({
      name: "John",
      email: "john@example.com",
    });
    expect(schema.parse({ name: "John" })).toEqual({
      name: "John",
      email: undefined,
    });
    expect(() =>
      schema.parse({ name: "John", email: "not-an-email" })
    ).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.string().optional();

    expect(schema.safeParse("hello").success).toBe(true);
    expect(schema.safeParse(undefined).success).toBe(true);
    expect(schema.safeParse(123).success).toBe(false);
  });
});
