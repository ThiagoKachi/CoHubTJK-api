import { AccountModel } from '@domain/models/account/account';

export interface LoadAccountByIdRepository {
  loadById (id: string): Promise<AccountModel | null>
}
