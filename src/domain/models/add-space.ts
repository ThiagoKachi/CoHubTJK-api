import { Address } from './space';

export interface AddSpaceModel {
  name: string;
  description: string;
  capacity: number;
  category: string;
  tags: string[];
  price: number;
  images: string[];
  resources: string[];
  address: Address;
  accountId: string;
}
