import { AccountModel } from '@domain/models/account';
import { AddAccountModel } from '@domain/models/add-account';

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel | null>
}
