//@ts-nocheck
import { v } from '../src';

describe('Integration tests', () => {
  test('complex schema validation', () => {
    const userSchema = v.object({
      id: v.string().uuid(),
      name: v.string().minLength(2).maxLength(50),
      email: v.string().email(),
      age: v.number().min(18).max(120).integer(),
      isActive: v.boolean(),
      tags: v.array(v.string()).minLength(1),
      profile: v.object({
        bio: v.string().optional(),
        website: v.string().url().nullable(),
        birthDate: v.date().max(new Date())
      }),
      role: v.union([
        v.string().pattern(/^admin$/),
        v.string().pattern(/^user$/),
        v.string().pattern(/^guest$/)
      ])
    }).strict();

    // Valid user data
    const validUser = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      isActive: true,
      tags: ['developer', 'javascript'],
      profile: {
        bio: 'Software developer',
        website: 'https://example.com',
        birthDate: new Date('1990-01-01')
      },
      role: 'admin'
    };

    expect(userSchema.parse(validUser)).toEqual(validUser);

    // Invalid user data (wrong email)
    const invalidUserEmail = {
      ...validUser,
      email: 'not-an-email'
    };
    expect(() => userSchema.parse(invalidUserEmail)).toThrow();

    // Invalid user data (under age)
    const invalidUserAge = {
      ...validUser,
      age: 16
    };
    expect(() => userSchema.parse(invalidUserAge)).toThrow();

    // Invalid user data (extra field)
    const invalidUserExtraField = {
      ...validUser,
      extra: 'field'
    };
    expect(() => userSchema.parse(invalidUserExtraField)).toThrow();

    // Invalid user data (wrong role)
    const invalidUserRole = {
      ...validUser,
      role: 'superadmin'
    };
    expect(() => userSchema.parse(invalidUserRole)).toThrow();
  });

  test('schema composition', () => {
    // Define base schemas
    const personSchema = v.object({
      name: v.string(),
      age: v.number().min(0)
    });

    const contactSchema = v.object({
      email: v.string().email(),
      phone: v.string().optional()
    });

    // Compose schemas into a more complex one
    const userSchema = v.object({
      ...personSchema._shape,
      ...contactSchema._shape,
      username: v.string().minLength(3),
      isAdmin: v.boolean()
    });

    const validUser = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      username: 'john123',
      isAdmin: false
    };

    expect(userSchema.parse(validUser)).toEqual(validUser);

    // Add phone number
    const validUserWithPhone = {
      ...validUser,
      phone: '+1234567890'
    };

    expect(userSchema.parse(validUserWithPhone)).toEqual(validUserWithPhone);

    // Invalid data
    const invalidUser = {
      ...validUser,
      username: 'jo' // too short
    };

    expect(() => userSchema.parse(invalidUser)).toThrow();
  });
});
