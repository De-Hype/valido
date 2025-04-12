import { v } from '../src';

describe('LiteralSchema', () => {
  test('validates string literals', () => {
    const schema = v.literal('hello');
    
    expect(schema.parse('hello')).toBe('hello');
    expect(() => schema.parse('world')).toThrow();
    expect(() => schema.parse(123)).toThrow();
    expect(() => schema.parse(true)).toThrow();
  });

  test('validates number literals', () => {
    const schema = v.literal(42);
    
    expect(schema.parse(42)).toBe(42);
    expect(() => schema.parse(43)).toThrow();
    expect(() => schema.parse('42')).toThrow();
  });

  test('validates boolean literals', () => {
    const schema = v.literal(true);
    
    expect(schema.parse(true)).toBe(true);
    expect(() => schema.parse(false)).toThrow();
    expect(() => schema.parse('true')).toThrow();
  });

  test('safeParse returns validation result', () => {
    const schema = v.literal('hello');
    
    expect(schema.safeParse('hello').success).toBe(true);
    expect(schema.safeParse('world').success).toBe(false);
  });
});