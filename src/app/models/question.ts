import { answer } from "./answer";

export interface question {
    questionid: string,
    examid: string,
    ecategoryid: string,
    question: string,
    answers?: answer[]
}