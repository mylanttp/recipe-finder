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
  
  diets: string[]
  setDiets: React.Dispatch<React.SetStateAction<string[]>>

  intolerances: string[]
  setIntolerances: React.Dispatch<React.SetStateAction<string[]>>

  displayDiets: string[]
  setDisplayDiets: React.Dispatch<React.SetStateAction<string[]>>

  displayIntolerances: string[]
  setDisplayIntolerances: React.Dispatch<React.SetStateAction<string[]>>
}