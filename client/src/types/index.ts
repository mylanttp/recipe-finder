export type Recipe = {
  id: number
  title: string
  image: string
  imageType: string
  saved: boolean
};

export type RecipeContextProps = {
  myRecipeList: Recipe[]
  onAdd: (recipe: Recipe) => Promise<boolean>
  onRemove: (recipe: Recipe) => Promise<boolean>
}