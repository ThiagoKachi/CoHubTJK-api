import { AddSpaceModel } from './add-space';

export type UpdateSpaceModel = Partial<Omit<AddSpaceModel, 'daysOfWeek'>>
