export interface UpdateSpaceRepository {
  updateSpace (id: string, available: boolean): Promise<void>
}
