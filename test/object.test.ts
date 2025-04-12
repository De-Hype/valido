import { v } from "../src";

describe("ObjectSchema", () => {
  test("validates objects", () => {
    const schema = v.object({
      name: v.string(),
      age: v.number(),
    });
    expect(schema.parse({ name: "John", age: 30 })).toEqual({
      name: "John",
      age: 30,
    });
    expect(() => schema.parse("not an object")).toThrow();
    expect(() => schema.parse({ name: "John", age: "30" })).toThrow();
    expect(() => schema.parse(null)).toThrow();
    expect(() => schema.parse(undefined)).toThrow();
  });

  test("strict mode validation", () => {
    const schema = v
      .object({
        name: v.string(),
        age: v.number(),
      })
      .strict();

    expect(schema.parse({ name: "John", age: 30 })).toEqual({
      name: "John",
      age: 30,
    });
    expect(() =>
      schema.parse({ name: "John", age: 30, extra: "field" })
    ).toThrow();
  });

  test("nested object validation", () => {
    const schema = v.object({
      user: v.object({
        name: v.string(),
        contact: v.object({
          email: v.string().email(),
        }),
      }),
    });

    expect(
      schema.parse({
        user: {
          name: "John",
          contact: {
            email: "john@example.com",
          },
        },
      })
    ).toEqual({
      user: {
        name: "John",
        contact: {
          email: "john@example.com",
        },
      },
    });

    expect(() =>
      schema.parse({
        user: {
          name: "John",
          contact: {
            email: "not-an-email",
          },
        },
      })
    ).toThrow();
  });

  test("safeParse returns validation result", () => {
    const schema = v.object({
      name: v.string(),
      age: v.number(),
    });

    expect(schema.safeParse({ name: "John", age: 30 }).success).toBe(true);
    expect(schema.safeParse({ name: "John", age: "30" }).success).toBe(false);
  });
});
