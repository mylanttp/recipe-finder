import { Recipe } from "../../types"

export type Question = {
    title: string,
    answers: Answer[],
}

export type Answer = {
    title: string,
    image: string,
    impact: number[]
}

export type ResultType = {
    title: string,
    blurb: string,
    recipe: Recipe
}