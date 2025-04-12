import { v } from "../src";

describe("NumberSchema", () => {
  test("validates numbers", () => {
    const schema = v.number();
    expect(schema.parse(123)).toBe(123);
    expect(() => schema.parse("123")).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("min validation", () => {
    const schema = v.number().min(5);
    expect(schema.parse(10)).toBe(10);
    expect(() => schema.parse(3)).toThrow();
  });

  test("max validation", () => {
    const schema = v.number().max(5);
    expect(schema.parse(3)).toBe(3);
    expect(() => schema.parse(10)).toThrow();
  });

  test("integer validation", () => {
    const schema = v.number().integer();
    expect(schema.parse(10)).toBe(10);
    expect(() => schema.parse(10.5)).toThrow();
  });

  test("positive validation", () => {
    const schema = v.number().positive();
    expect(schema.parse(10)).toBe(10);
    expect(() => schema.parse(0)).toThrow();
    expect(() => schema.parse(-10)).toThrow();
  });

  test("negative validation", () => {
    const schema = v.number().negative();
    expect(schema.parse(-10)).toBe(-10);
    expect(() => schema.parse(0)).toThrow();
    expect(() => schema.parse(10)).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.number();
    expect(schema.safeParse(123).success).toBe(true);
    expect(schema.safeParse("123").success).toBe(false);
  });
});
