import { AuthenticationModel } from '@domain/models/account/authentication';
import { ValidationError } from '@domain/models/validation-error/validation-error';
import { SigninValidator } from '@validation/protocols/account/signin-validator';
import { z } from 'zod';

export class SigninValidatorAdapter implements SigninValidator {
  private signinSchema = z.object({
    email: z.string().email({ message: 'Invalid email' }).min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required')
  });

  validate (data: AuthenticationModel): void | ValidationError {
    const result = this.signinSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        error: result.error
      };
    }
  }
}
