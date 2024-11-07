import { AccountModel } from '@domain/models/account/account';
import { AddAccountModel } from '@domain/models/account/add-account';

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
