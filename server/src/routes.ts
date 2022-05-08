import express from 'express';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './repositories/use-cases/submit-feedbacks-use-cases';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';



export const routes = express.Router()



routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbackRepository()
  const nodeMailerAdapter = new NodemailerMailAdapter()
   
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodeMailerAdapter
  )
    
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(200).send();
})
