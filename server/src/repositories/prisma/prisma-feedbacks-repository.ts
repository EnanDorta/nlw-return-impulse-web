import { prisma } from "../../prisma";
import { FeedbacksCreateData, FeedbackRepository } from "../feedbacks-repositories";

export class PrismaFeedbackRepository implements FeedbackRepository {
  async create({ type, comment, screenshot }: FeedbacksCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      },
    })
  }
}
