export type Question = {
    title: string,
    answers: Answer[],
}

export type Answer = {
    title: string,
    image: string,
    impact: number[]
}