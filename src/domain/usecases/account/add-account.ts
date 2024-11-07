import { AccountModel } from '@domain/models/account/account';
import { AddAccountModel } from '@domain/models/account/add-account';

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel | null>
}
