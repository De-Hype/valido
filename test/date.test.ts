import { v } from "../src";

describe("DateSchema", () => {
  test("validates dates", () => {
    const schema = v.date();
    const date = new Date();
    expect(schema.parse(date)).toBe(date);
    expect(() => schema.parse("2023-01-01")).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("min validation", () => {
    const min = new Date("2023-01-01");
    const schema = v.date().min(min);
    expect(schema.parse(new Date("2023-06-01"))).toEqual(
      new Date("2023-06-01")
    );
    expect(() => schema.parse(new Date("2022-06-01"))).toThrow();
  });

  test("max validation", () => {
    const max = new Date("2023-01-01");
    const schema = v.date().max(max);
    expect(schema.parse(new Date("2022-06-01"))).toEqual(
      new Date("2022-06-01")
    );
    expect(() => schema.parse(new Date("2023-06-01"))).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.date();
    expect(schema.safeParse(new Date()).success).toBe(true);
    expect(schema.safeParse("2023-01-01").success).toBe(false);
  });
});
