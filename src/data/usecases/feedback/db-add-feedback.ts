import { LoadAccountByIdRepository } from '@data/protocols/db/account/load-account-by-id';
import { AddFeedbackRepository } from '@data/protocols/db/feedback/add-feedback-repository';
import { LoadReservationByIdRepository } from '@data/protocols/db/reservation/load-reservation-by-id';
import { LoadSpaceByIdRepository } from '@data/protocols/db/space/load-space-by-id';
import { AddFeedbackModel } from '@domain/models/feedback/add-feedback';
import { FeedbackModel } from '@domain/models/feedback/feedback';
import { AddFeedback } from '@domain/usecases/feedback/add-feedback';

export class DbAddFeedback implements AddFeedback {
  constructor(
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly loadSpaceByIdRepository: LoadSpaceByIdRepository,
    private readonly loadReservationByIdRepository: LoadReservationByIdRepository,
    private readonly addFeedbackRepository: AddFeedbackRepository
  ) {}

  async add(feedbackData: AddFeedbackModel): Promise<FeedbackModel | null> {
    const account = await this.loadAccountByIdRepository.loadById(feedbackData.accountId);

    if (account) {
      const space = await this.loadSpaceByIdRepository.loadById(feedbackData.spaceId);

      if (space) {
        const reservation = await this.loadReservationByIdRepository.loadById(feedbackData.reservationId);

        if (reservation && reservation.feedback?.length === 0 && reservation.finished_at !== null) {
          if (reservation.accountId === feedbackData.accountId) {
            const feedbackRes = await this.addFeedbackRepository.add(feedbackData);

            return feedbackRes;
          }
        }
      }
    }

    return null;
  }
}
