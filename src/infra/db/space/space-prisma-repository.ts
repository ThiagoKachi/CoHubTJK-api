import { AddSpaceRepository } from '@data/protocols/db/space/add-space-repository';
import { SpaceModel } from '@domain/models/space';
import { prismaClient } from '../prismaClient';

export class SpacePrismaRepository implements AddSpaceRepository {
  async add(spaceData: SpaceModel): Promise<SpaceModel> {
    await prismaClient.space.create({
      data: {
        name: spaceData.name,
        description: spaceData.description,
        capacity: spaceData.capacity,
        category: spaceData.category,
        tags: spaceData.tags,
        price: spaceData.price,
        images: spaceData.images,
        resources: spaceData.resources,
        available: spaceData.available,
        accountId: spaceData.accountId,
        street: spaceData.address.street,
        number: spaceData.address.number,
        city: spaceData.address.city,
        state: spaceData.address.state,
        postal_code: spaceData.address.postal_code,
        neighborhood: spaceData.address.neighborhood,
        complement: spaceData.address.complement,
      },
    });

    return { ...spaceData };
  }
}
