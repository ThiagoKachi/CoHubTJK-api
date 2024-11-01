export type AccountType = 'ADMIN' | 'MEMBER';

export interface AccountModel {
  id: string;
  email: string;
  name: string;
  password: string;
  token: string | null;
  role: AccountType;
  created_at: Date;
}
