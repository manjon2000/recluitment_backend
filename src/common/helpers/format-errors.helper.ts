import { ValidationError } from 'class-validator';

export function formatErrors(errors: ValidationError[]) {
  const formattedErrors = {};
  errors.forEach((error) => {
    if (error.constraints) {
      formattedErrors[error.property] = Object.values(error.constraints)[0];
    }
  });
  return formattedErrors;
}
