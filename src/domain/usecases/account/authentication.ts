import { AuthenticationModel } from '@domain/models/authentication';

export interface Authentication {
  auth (authentication: AuthenticationModel): Promise<string | null>
}
