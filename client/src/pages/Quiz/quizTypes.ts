export type Question = {
    title: string,
    answers: Answer[],
}

export type Answer = {
    title: string,
    image: string,
    impact: number[]
}

export type Result = {
    title: string,
    blurb: string,
    recipeId: number
}