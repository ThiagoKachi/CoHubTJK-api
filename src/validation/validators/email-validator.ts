
import { AppError } from '@presentation/errors/AppError';
import { Validation } from '@presentation/protocols/validate';
import { EmailValidator } from '@validation/protocols/email-validator';

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: string): void {
    const isValid = this.emailValidator.isValid(input);
    if (!isValid) {
      throw new AppError('Invalid email', 400);
    }
  }
}
