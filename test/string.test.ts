import { v } from "../src";

describe("StringSchema", () => {
  test("validates strings", () => {
    const schema = v.string();
    expect(schema.parse("hello")).toBe("hello");
    expect(() => schema.parse(123)).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("minLength validation", () => {
    const schema = v.string().minLength(5);
    expect(schema.parse("hello")).toBe("hello");
    expect(() => schema.parse("hi")).toThrow();
  });

  test("maxLength validation", () => {
    const schema = v.string().maxLength(5);
    expect(schema.parse("hello")).toBe("hello");
    expect(() => schema.parse("hello world")).toThrow();
  });

  test("pattern validation", () => {
    const schema = v.string().pattern(/^[a-z]+$/);
    expect(schema.parse("hello")).toBe("hello");
    expect(() => schema.parse("Hello")).toThrow();
  });

  test("email validation", () => {
    const schema = v.string().email();
    expect(schema.parse("test@example.com")).toBe("test@example.com");
    expect(() => schema.parse("invalid-email")).toThrow();
  });

  test("url validation", () => {
    const schema = v.string().url();
    expect(schema.parse("https://example.com")).toBe("https://example.com");
    expect(() => schema.parse("invalid-url")).toThrow();
  });

  test("uuid validation", () => {
    const schema = v.string().uuid();
    expect(schema.parse("123e4567-e89b-12d3-a456-426614174000")).toBe(
      "123e4567-e89b-12d3-a456-426614174000"
    );
    expect(() => schema.parse("invalid-uuid")).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.string();
    expect(schema.safeParse("hello").success).toBe(true);
    expect(schema.safeParse(123).success).toBe(false);
  });
});
