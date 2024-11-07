import { SpaceModel } from '@domain/models/space/space';

export interface ListSpacesFilters {
  name?: string;
  capacity?: number;
  price?: number;
  resources?: string[];
  tags?: string[];
  available?: boolean;
}

export interface LoadSpaces {
  load (filters: ListSpacesFilters): Promise<SpaceModel[]>
}
