export interface SpaceModel {
  id: string;
  name: string;
  description: string;
  capacity: number;
  category: string;
  tags: string[];
  price: number;
  images: string[];
  resources: string[];
  street: string;
  number: number;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  postal_code: string;
  created_at: Date;
  updated_at: Date;
  accountId: string;
  available: boolean;
}
