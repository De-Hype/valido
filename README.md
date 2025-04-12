# Valido

Valido is a lightweight, type-safe package that helps you validate data in JavaScript and TypeScript with easy-to-use, reusable schemas.

## Installation

```bash
npm install valido
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
import v from 'valido';

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
