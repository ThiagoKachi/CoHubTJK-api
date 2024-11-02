import { AddAccountModel } from '@domain/models/add-account';
import { ValidationError } from '@domain/models/validation-error';
import { SignupValidator } from '@validation/protocols/signup-validator';
import { z } from 'zod';

export class SignupValidatorAdapter implements SignupValidator {
  private signupSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }).min(1, 'Email is required'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(6, 'Password is required')
  });

  validate (data: AddAccountModel): void | ValidationError {
    const result = this.signupSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
