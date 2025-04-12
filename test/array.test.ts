import { v } from "../src";

describe("ArraySchema", () => {
  test("validates arrays", () => {
    const schema = v.array(v.string());
    expect(schema.parse(["hello", "world"])).toEqual(["hello", "world"]);
    expect(() => schema.parse("not an array")).toThrow();
    expect(() => schema.parse([1, 2, 3])).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("minLength validation", () => {
    const schema = v.array(v.string()).minLength(2);
    expect(schema.parse(["hello", "world"])).toEqual(["hello", "world"]);
    expect(() => schema.parse(["hello"])).toThrow();
  });

  test("maxLength validation", () => {
    const schema = v.array(v.string()).maxLength(2);
    expect(schema.parse(["hello", "world"])).toEqual(["hello", "world"]);
    expect(() => schema.parse(["hello", "world", "extra"])).toThrow();
  });

  test("nested validation", () => {
    const schema = v.array(v.object({ name: v.string() }));
    expect(schema.parse([{ name: "John" }, { name: "Jane" }])).toEqual([
      { name: "John" },
      { name: "Jane" },
    ]);
    expect(() => schema.parse([{ name: "John" }, { name: 123 }])).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.array(v.string());
    expect(schema.safeParse(["hello", "world"]).success).toBe(true);
    expect(schema.safeParse("not an array").success).toBe(false);
  });
});
