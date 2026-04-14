import { Recipe, RecipeList } from "../types";

/*
type RecipeData = {
  id: number
  title: string
  image: string
  imageType: string
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
  */
type apiResponse = {
  results: Recipe[]

}

const toRecipeList = (dataList: apiResponse): RecipeList => {
  const recipes: Recipe[] = dataList.results;
  return {list: recipes} as RecipeList;
}

export const fetchRecipeList = (search: string): Promise<RecipeList> => {
  return fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(search)}`,
  )
  .then((response) => {
      console.log("api status (client):", response.status);
      return response.json();
    })
  .then((data) => {
    console.log("client data:", data)
    return toRecipeList(data)
  })
};