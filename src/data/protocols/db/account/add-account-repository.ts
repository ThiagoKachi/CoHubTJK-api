import { AccountModel } from '@domain/models/account';

export interface AddAccountRepository {
  add (accountData: AccountModel): Promise<AccountModel>
}
