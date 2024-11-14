import { EmailValidator } from '@validation/protocols/email-validator';
import { z } from 'zod';

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    const emailSchema = z.string().email();

    const result = emailSchema.safeParse(email);

    return result.success;
  }
}
