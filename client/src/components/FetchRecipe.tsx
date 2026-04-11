import { Recipe, RecipeList } from "../types";


type RecipeData = {
  title: string;
  servings: string;
  ingredients: string;
  instructions: string
}

const toRecipeDataToRecipe = (data: RecipeData): Recipe => {
  const ingredientsList = data.ingredients.split("|").map(item => item.trim());
  const instructionsList = data.instructions.split(". ").map(item => item.trim());

  return {
    id: data.title,
    title: data.title,
    servings: data.servings,
    ingredients: ingredientsList as string[],
    instructions: instructionsList as string[],
  }
}

const toRecipeList = (dataList: RecipeData[]): RecipeList => {
  const newList: Recipe[] = [];
  for (let i = 0; i < dataList.length; i++){
    newList.push(toRecipeDataToRecipe(dataList[i]) as Recipe);
  }
  return {list: newList} as RecipeList;
}

export const fetchRecipeList = (search: string): Promise<RecipeList> => {
  return fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(search)}`,
  )
  .then((res) => res.json())
  .then((data: RecipeData[]) => toRecipeList(data));
};


/**
export type RandomRecipeAPIResponse = {
  meals: RecipeData[]
}

export type RecipeData = {
  strMeal: string
  strIngredient1:string
  strIngredient2:string
  strIngredient3:string
  strIngredient4:string
  strIngredient5:string
  strIngredient6:string
  strIngredient7:string
  strIngredient8:string
  strIngredient9:string
  strIngredient10:string
  strIngredient11:string
}

export const recipeDataToRecipe = (data: RecipeData): Recipe => {
    const list: string[] = [];
    for (let i = 1; i <= 11; i++) {
    const ingredient = data[`strIngredient${i}` as keyof RecipeData];
    if (ingredient) {
      list.push(ingredient);
    }
  }
    return {
        title: data.strMeal,
        ingredients: list
    }
}

const toRecipeList = (dataList: RecipeData[]): RecipeList => {
  const newList: Recipe[] = [];
  for (let i = 1; i < dataList.length; i++){
    newList.push(recipeDataToRecipe(dataList[i]) as Recipe);
  }
  return {list: newList} as RecipeList;
}

export const fetchRecipeList = (search: string): Promise<RecipeList> => {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
      .then((res) => res.json())
      .then((data: RandomRecipeAPIResponse) => data.meals)
      .then((listData: RecipeData[]) => toRecipeList(listData) )
}
*/


