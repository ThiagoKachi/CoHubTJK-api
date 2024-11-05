import { AddSpaceRepository } from '@data/protocols/db/space/add-space-repository';
import { LoadSpacesRepository } from '@data/protocols/db/space/load-spaces-repository';
import { SpaceModel } from '@domain/models/space';
import { ListSpacesFilters } from '@domain/usecases/space/load-spaces';
import { prismaClient } from '../prismaClient';

function validateFields(fields: string[] | string) {
  const fieldToFilter = Array.isArray(fields) ? fields : [fields].filter(Boolean);
  const validFields = fieldToFilter.filter((tag): tag is string => tag !== undefined);

  return validFields;
}

export class SpacePrismaRepository implements AddSpaceRepository, LoadSpacesRepository {
  async load(filters: ListSpacesFilters): Promise<SpaceModel[]> {
    const { available, name, capacity, price, resources, tags } = filters;

    const isAvailable = String(available) === 'true' ? true : String(available) === 'false' ? false : undefined;

    const spaces = await prismaClient.space.findMany({
      where: {
        name: {
          contains: name ?? undefined,
        },
        capacity: capacity ? { gte:  Number(capacity) } : undefined,
        price: price ? { lte:  Number(price) } : undefined,
        available: isAvailable,
        tags: tags ? { hasSome: validateFields(tags) } : undefined,
        resources: resources ? { hasSome: validateFields(resources) } : undefined,
      },
      include: {
        adm: true,
      },
    });

    return spaces.map((space) => ({
      id: space.id,
      name: space.name,
      description: space.description,
      capacity: space.capacity,
      category: space.category,
      tags: space.tags,
      price: space.price.toNumber(),
      images: space.images,
      resources: space.resources,
      available: space.available,
      accountId: space.accountId,
      created_at: space.created_at.toISOString(),
      updated_at: space.updated_at.toISOString(),
      address: {
        street: space.street,
        number: space.number,
        city: space.city,
        state: space.state,
        postal_code: space.postal_code,
        neighborhood: space.neighborhood,
        complement: space.complement || undefined,
      },
    }));
  }

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
