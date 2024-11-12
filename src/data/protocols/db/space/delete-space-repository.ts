export interface DeleteSpaceRepository {
  delete (spaceId: string): Promise<void>
}
