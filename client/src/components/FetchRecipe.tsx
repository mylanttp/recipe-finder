import { Recipe } from "../types";

type apiResponse = {
  results: Recipe[]
}

type Props = {
  search: string
  diet: string[]
  intolerances: string[]
}

const toRecipeList = (dataList: apiResponse): Recipe[] => {
  const recipes: Recipe[] = dataList.results;
  return recipes as Recipe[];
}

export const fetchRecipeList = ({search, diet, intolerances}: Props): Promise<Recipe[]> => {
  return fetch(`${import.meta.env.VITE_API_URL}/api/search?q=${encodeURIComponent(search)}
                &diet=${encodeURIComponent(diet.join(','))}
                &intolerances=${encodeURIComponent(intolerances.join(','))}`)
  .then((response) => {
      console.log("api status (client):", response.status);
      return response.json();
    })
  .then((data) => {
    console.log("client data:", data)
    return toRecipeList(data)
  })
};

