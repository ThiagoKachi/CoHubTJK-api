import { AccountModel } from '@domain/models/account';
import { CreateAccountModel } from '@domain/models/create-account';

export interface AddAccount {
  add (account: CreateAccountModel): Promise<AccountModel>
}
