import { AuthenticationModel } from '@domain/models/account/authentication';

export interface Authentication {
  auth (authentication: AuthenticationModel): Promise<string | null>
}
