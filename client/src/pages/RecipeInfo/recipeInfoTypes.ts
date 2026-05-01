export type Measure = {
    amount: number
    unitLong: string
    unitShort: string
}

export type Ingredient = {
    aisle: string
    amount: number
    consistency: string
    id: number
    image: string
    measures: {
        metric: Measure
        us: Measure
    }
    meta: string[]
    name: string
    original: string
    originalName: string
    unit: string
}

export type RecipeInfoType = {
    id: number
    title: string
    image: string
    imageType: string
    servings: number
    readyInMinutes: number
    cookingMinutes: number
    preparationMinutes: number
    license: string
    sourceName: string
    sourceUrl: string
    spoonacularSourceUrl: string
    healthScore: number
    spoonacularScore: number
    pricePerServing: number
    cheap: boolean
    creditsText: string
    cuisines: string[]
    dairyFree: boolean
    diets: string[]
    gaps: string
    glutenFree: boolean
    instructions: string
    ketogenic: boolean
    lowFodmap: boolean
    occasions: string[]
    sustainable: boolean
    vegan: boolean
    vegetarian: boolean
    veryHealthy: boolean
    veryPopular: boolean
    whole30: boolean
    dishTypes: string[]
    extendedIngredients: Ingredient[]
    summary: string
}