export interface FeedbacksCreateData {
  type: string,
  comment: string,
  screenshot?: string
}

export interface FeedbackRepository {
  create: (data: FeedbacksCreateData) => Promise<void>;
}
