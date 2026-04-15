import { Recipe, RecipeList } from "../types";

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