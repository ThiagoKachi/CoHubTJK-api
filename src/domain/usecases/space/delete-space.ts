export interface DeleteSpace {
  delete (spaceId: string): Promise<void | null>
}
