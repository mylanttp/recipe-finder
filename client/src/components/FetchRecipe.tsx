import { Recipe } from "../types";

type apiResponse = {
  results: Recipe[]

}

const toRecipeList = (dataList: apiResponse): Recipe[] => {
  const recipes: Recipe[] = dataList.results;
  return recipes as Recipe[];
}

export const fetchRecipeList = (search: string): Promise<Recipe[]> => {
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