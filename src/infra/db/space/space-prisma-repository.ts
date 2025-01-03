import { AddSpaceRepository } from '@data/protocols/db/space/add-space-repository';
import { CreateSpaceTimeSlotsRepository } from '@data/protocols/db/space/create-space-time-slots-repository';
import { DeleteSpaceRepository } from '@data/protocols/db/space/delete-space-repository';
import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { LoadSpacesRepository } from '@data/protocols/db/space/load-spaces-repository';
import { UpdateSpaceAvailabilityRepository } from '@data/protocols/db/space/update-space-availability-repository';
import { UpdateSpaceRepository } from '@data/protocols/db/space/update-space-repository';
import { AddSpaceModel } from '@domain/models/space/add-space';
import { SpaceModel, WorkingHours } from '@domain/models/space/space';
import { UpdateSpaceModel } from '@domain/models/space/update-space';
import { ListSpacesFilters } from '@domain/usecases/space/load-spaces';
import { DaysOfWorkType } from '@prisma/client';
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

export class SpacePrismaRepository implements
  AddSpaceRepository,
  LoadSpacesRepository,
  UpdateSpaceAvailabilityRepository,
  LoadSpaceByIdRepository,
  DeleteSpaceRepository,
  UpdateSpaceAvailabilityRepository,
  UpdateSpaceRepository,
  CreateSpaceTimeSlotsRepository {
  async createTimeSlots(_spaceTimeSlotsData: WorkingHours): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async updateSpace(spaceId: string, spaceData: UpdateSpaceModel): Promise<SpaceModel> {
    const { workingHours, ...dataSpace } = spaceData;

    const space = await prismaClient.space.update({ where: { id: spaceId }, data: {
      ...dataSpace,
      startTime: String(workingHours?.startTime),
      endTime: String(workingHours?.endTime),
      slotDuration: workingHours?.slotDuration,
      daysOfWeek: workingHours?.daysOfWeek as DaysOfWorkType[]
    }});

    return {
      ...space,
      price: Number(space.price),
    };
  }

  async delete(spaceId: string): Promise<void> {
    await prismaClient.space.delete({ where: { id: spaceId } });
  }

  async loadById(id: string): Promise<SpaceModel | null> {
    const space = await prismaClient.space.findFirst({ where: { id } });

    if (!space) return null;

    return {
      ...space,
      price: Number(space.price),
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
        adm: { select: { id: true, email: true, name: true } },
        feedback: true,
        timeSlot: true,
      },
    });

    return spaces.map((space) => ({
      ...space,
      price: Number(space.price),
    }));
  }

  async add(spaceData: AddSpaceModel & { accountId: string }): Promise<SpaceModel> {
    const { workingHours, accountId, ...dataSpace } = spaceData;

    const space = await prismaClient.space.create({
      data: {
        ...dataSpace,
        startTime: String(workingHours.startTime),
        endTime: String(workingHours.endTime),
        slotDuration: workingHours.slotDuration,
        daysOfWeek: workingHours.daysOfWeek as DaysOfWorkType[],
        adm: { connect: { id: accountId } },
      }});

    return {
      ...space,
      price: Number(space.price),
    };
  }
}
