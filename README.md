# Valix-validator

Valix-validator is a lightweight, type-safe package that helps you validate data in JavaScript and TypeScript with easy-to-use, reusable schemas.

## Installation

```bash
npm i valix-validator
```

## Features

- 💪 Fully TypeScript compatible with type inference
- 🔄 Framework-agnostic (works with any JS framework)
- 🔍 Rich validation rules for common types
- 🧩 Composable schemas for complex validation
- 🛡️ Runtime type checking
- 📊 Detailed error messages

## Basic Usage

```typescript
import v from 'valix-validator';

// Define a schema
const userSchema = v.object({
  username: v.string().minLength(3).maxLength(20),
  email: v.string().email(),
  age: v.number().min(18).integer(),
  isActive: v.boolean()
});

// Type is inferred from schema
type User = v.infer<typeof userSchema>;

// Validate data
try {
  const validatedUser = userSchema.parse({
    username: 'john_doe',
    email: 'john@example.com',
    age: 25,
    isActive: true
  });
  
  // validatedUser is typed as User
  console.log(validatedUser);
} catch (error) {
  console.error('Validation error:', error);
}

// Safe parsing (doesn't throw)
const result = userSchema.safeParse({
  username: 'jo', // too short
  email: 'not-an-email',
  age: 17.5,
  isActive: true
});

if (!result.success) {
  console.log('Invalid data:', result.error);
} else {
  console.log('Valid data:', result.value);
}
```

## Available Validators

- `v.string()` - Validates strings
- `v.number()` - Validates numbers
- `v.boolean()` - Validates booleans
- `v.date()` - Validates Date objects
- `v.array()` - Validates arrays
- `v.object()` - Validates objects
- `v.union()` - Validates union types
- `v.literal()` - Validates literal values
- `v.tuple()` - Validates tuples
- `v.record()` - Validates records (objects with specific key/value types)
- `v.any()` - Accepts any value

## Common Validator Methods

### String Methods
- `.minLength(n)` - String must be at least n characters
- `.maxLength(n)` - String must not exceed n characters
- `.pattern(regex)` - String must match the regex pattern
- `.email()` - String must be a valid email
- `.url()` - String must be a valid URL
- `.uuid()` - String must be a valid UUID

### Number Methods
- `.min(n)` - Number must be at least n
- `.max(n)` - Number must not exceed n
- `.integer()` - Number must be an integer
- `.positive()` - Number must be positive
- `.negative()` - Number must be negative

### Date Methods
- `.min(date)` - Date must be after the specified date
- `.max(date)` - Date must be before the specified date

### Array Methods
- `.minLength(n)` - Array must have at least n items
- `.maxLength(n)` - Array must not exceed n items

### Object Methods
- `.strict()` - Object must not have extra properties

### Common Methods for All Types
- `.optional()` - Makes the value optional (value | undefined)
- `.nullable()` - Makes the value nullable (value | null)

## License

MIT
