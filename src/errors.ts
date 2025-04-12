import { ValidationError } from './types';

export class ValidoError extends Error {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('Validation failed');
    this.name = 'ValidoError';
    this.errors = errors;
  }

  static formatPath(path: string[]): string {
    if (path.length === 0) return 'value';
    return path.join('.');
  }
}