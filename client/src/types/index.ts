export type Recipe = {
  id: string;
  title: string;
  servings?: string;
  ingredients?: string[];
  instructions?: string[];
};

export type RecipeList = {
  list: Recipe[]
};