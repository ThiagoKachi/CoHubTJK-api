import { WorkingHours } from './space';

export interface AddSpaceModel {
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
  workingHours: WorkingHours;
}
