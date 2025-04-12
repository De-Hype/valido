import { v } from "../src";

describe("NullableSchema", () => {
  test("validates nullable types", () => {
    const schema = v.string().nullable();

    expect(schema.parse("hello")).toBe("hello");
    expect(schema.parse(null)).toBe(null);
    expect(() => schema.parse(123)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("complex nullable validation", () => {
    const schema = v.object({
      name: v.string(),
      email: v.string().email().nullable(),
    });

    expect(schema.parse({ name: "John", email: "john@example.com" })).toEqual({
      name: "John",
      email: "john@example.com",
    });
    expect(schema.parse({ name: "John", email: null })).toEqual({
      name: "John",
      email: null,
    });
    expect(() =>
      schema.parse({ name: "John", email: "not-an-email" })
    ).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.string().nullable();

    expect(schema.safeParse("hello").success).toBe(true);
    expect(schema.safeParse(null).success).toBe(true);
    expect(schema.safeParse(123).success).toBe(false);
  });
});
