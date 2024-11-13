export interface UpdateSpaceAvailabilityRepository {
  updateSpaceAvailability (id: string, available: boolean): Promise<void>
}
