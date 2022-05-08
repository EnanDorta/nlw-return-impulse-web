import { useState } from "react";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

import bugImgUrl from '../../assets/bug.svg'
import ideaImgUrl from '../../assets/idea.svg'
import toughtImgUrl from '../../assets/thought.svg'
import { FeedbackSucessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImgUrl,
      alt: 'Imagem de um inseto'
    }
  }, 
  IDEA: {
    title: 'Idea',
    image: {
      source: ideaImgUrl,
      alt: 'Imagem de um inseto'
    }
  }, 
  OTHER: {
    title: 'Outro',
    image: {
      source: toughtImgUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  }, 
}

export type FeedbackType = keyof typeof feedbackTypes
 

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto" >
      { feedbackSent ? (
        <FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ): (
            <FeedbackContentStep 
              feedbackType={feedbackType} 
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)} 
            />
          )}
        </>
      ) }

      <footer className="text-ts text-neutral-400">
        Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  )
}