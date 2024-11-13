import { AddSpaceRepository } from '@data/protocols/db/space/add-space-repository';
import { DeleteSpaceRepository } from '@data/protocols/db/space/delete-space-repository';
import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { LoadSpacesRepository } from '@data/protocols/db/space/load-spaces-repository';
import { UpdateSpaceAvailabilityRepository } from '@data/protocols/db/space/update-space-availability-repository';
import { SpaceModel } from '@domain/models/space/space';
import { ListSpacesFilters } from '@domain/usecases/space/load-spaces';
import { prismaClient } from '../prismaClient';

function validateFields(fields: string[] | string) {
  const fieldToFilter = Array.isArray(fields)
    ? fields
    : [fields].filter(Boolean);
  const validFields = fieldToFilter.filter(
    (tag): tag is string => tag !== undefined
  );

  return validFields;
}

export class SpacePrismaRepository
implements
    AddSpaceRepository,
    LoadSpacesRepository,
    UpdateSpaceAvailabilityRepository,
    LoadSpaceByIdRepository,
    DeleteSpaceRepository
{
  async delete(spaceId: string): Promise<void> {
    await prismaClient.space.delete({ where: { id: spaceId } });
  }

  async loadById(id: string): Promise<SpaceModel | null> {
    const space = await prismaClient.space.findFirst({ where: { id } });

    if (!space) return null;

    return {
      ...space,
      price: Number(space.price),
      created_at: new Date(space.created_at).toISOString(),
      updated_at: new Date(space.updated_at).toISOString(),
      complement: space.complement === null ? undefined : space.complement,
    };
  }

  async updateSpaceAvailability(id: string, available: boolean): Promise<void> {
    await prismaClient.space.update({ where: { id }, data: { available } });
  }

  async load(filters: ListSpacesFilters): Promise<SpaceModel[]> {
    const { available, name, capacity, price, resources, tags } = filters;

    const isAvailable =
      String(available) === 'true'
        ? true
        : String(available) === 'false'
          ? false
          : undefined;

    const spaces = await prismaClient.space.findMany({
      where: {
        name: {
          contains: name ?? undefined,
        },
        capacity: capacity ? { gte: Number(capacity) } : undefined,
        price: price ? { lte: Number(price) } : undefined,
        available: isAvailable,
        tags: tags ? { hasSome: validateFields(tags) } : undefined,
        resources: resources
          ? { hasSome: validateFields(resources) }
          : undefined,
      },
      include: {
        adm: true,
      },
    });

    return spaces.map((space) => ({
      ...space,
      price: Number(space.price),
      created_at: new Date(space.created_at).toISOString(),
      updated_at: new Date(space.updated_at).toISOString(),
      complement: space.complement === null ? undefined : space.complement,
    }));
  }

  async add(spaceData: SpaceModel): Promise<SpaceModel> {
    console.log(spaceData);
    const space = await prismaClient.space.create({ data: spaceData });

    return {
      ...space,
      price: Number(space.price),
      created_at: new Date(space.created_at).toISOString(),
      updated_at: new Date(space.updated_at).toISOString(),
      complement: space.complement === null ? undefined : space.complement,
    };
  }
}
