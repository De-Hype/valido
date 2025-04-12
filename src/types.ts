import { Schema } from "./schema";

export type ValidationResult<T> = {
    success: boolean;
    value?: T;
    error?: ValidationError;
  };
  
  export type ValidationContext = {
    path: string[];
    originalValue: unknown;
  };
  
  export type ValidationError = {
    path: string[];
    message: string;
    originalValue: unknown;
  };
  
  export type ValidationOptions = {
    abortEarly?: boolean;
  };
  
  export type SchemaType<T> = Schema<T>;