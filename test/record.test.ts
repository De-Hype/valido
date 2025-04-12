import { v } from "../src";

describe("RecordSchema", () => {
  test("validates records", () => {
    const schema = v.record(v.string(), v.number());

    expect(schema.parse({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
    expect(() => schema.parse({ a: 1, b: "2" })).toThrow();
    expect(() => schema.parse(123)).toThrow();
  });

  test("validates with string pattern keys", () => {
    const schema = v.record(v.string().pattern(/^[a-z]+$/), v.number());

    expect(schema.parse({ abc: 1, def: 2 })).toEqual({ abc: 1, def: 2 });
    expect(() => schema.parse({ ABC: 1 })).toThrow(); 
  });

  test("validates with complex value schemas", () => {
    const schema = v.record(
      v.string(),
      v.object({
        name: v.string(),
        age: v.number(),
      })
    );

    const data = {
      user1: { name: "John", age: 30 },
      user2: { name: "Jane", age: 25 },
    };

    expect(schema.parse(data)).toEqual(data);
    expect(() =>
      schema.parse({
        user1: { name: "John", age: 30 },
        user2: { name: "Jane", age: "twenty-five" },
      })
    ).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.record(v.string(), v.number());

    expect(schema.safeParse({ a: 1, b: 2 }).success).toBe(true);
    expect(schema.safeParse({ a: 1, b: "2" }).success).toBe(false);
  });
});
