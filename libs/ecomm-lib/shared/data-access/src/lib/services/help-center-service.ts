export interface HelpCenterQuestion {
  id: number;
  question: string;
  answer: string;
}

export const questionsList: HelpCenterQuestion[] = [
  {
    id: 1,
    question: "Do the prices on the website include tickets, taxes & fees?",
    answer: "Do the prices on the website include tickets, taxes & fees",
  },
  {
    id: 2,
    question: "Do you skip the line for tickets on all your tours?",
    answer: "Do you skip the line for tickets on all your tours",
  },
  {
    id: 3,
    question: "Do your guides speak English?",
    answer: "Do your guides speak English",
  },
  {
    id: 4,
    question: "Can we request a guide?",
    answer: "Can we request a guide",
  },
  {
    id: 5,
    question: "What is your payment policy?",
    answer: "What is your payment policy",
  },
  {
    id: 6,
    question: "What is your cancellation policy?",
    answer: "What is your cancellation policy",
  },
  {
    id: 7,
    question: "Will the guide pick us up at our Hotel?",
    answer: "Will the guide pick us up at our Hotel",
  },
  {
    id: 8,
    question: "Will we do a lot of walking?",
    answer: "Will we do a lot of walking",
  },
  {
    id: 9,
    question: "Do we need to wear long pants at the Vatican?",
    answer: "Do we need to wear long pants at the Vatican?",
  },
]

export async function fetchHelpCenterQuestion(): Promise<HelpCenterQuestion[]> {
  const timeoutPromise = (timeout: number): Promise<HelpCenterQuestion[]> => {
    return new Promise((resolve) => {
      return setTimeout(() => resolve(questionsList), timeout);
    });
  };
  return await timeoutPromise(200);
}
