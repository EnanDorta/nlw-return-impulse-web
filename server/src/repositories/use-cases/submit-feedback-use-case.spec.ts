import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-cases"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'This a test',
      screenshot: 'data:image/png;d1as5d1as5d1asd5as1d5a1a5a',
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'This a test',
      screenshot: 'data:image/png;d1as5d1as5d1asd5as1d5a1a5a',
    })).rejects.toThrow()
  })
  
  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;d1as5d1as5d1asd5as1d5a1a5a',
    })).rejects.toThrow()
  })
  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Ocorreu um erro ao clicar no botão de comprar',
      screenshot: 'test.jpg',
    })).rejects.toThrow()
  })
})