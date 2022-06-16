import { RecipeScope, RecipeTags, TimeUnits } from './constants';
import { IIngredient } from './IIngredient';
import ICookingStep from './ICookingStep';

export type recipeScope = RecipeScope.PRIVATE | RecipeScope.PUBLIC;

export type recipeTags = RecipeTags.BREAKFAST | RecipeTags.LUNCH | RecipeTags.DINNER |
  RecipeTags.SNACK | RecipeTags.DESERT | RecipeTags.VEGETARIAN | RecipeTags.VEGAN;
  
export type timeUnit = TimeUnits.MILISECONDS | TimeUnits.SECONDS | TimeUnits.MINUTES | TimeUnits.HOURS | TimeUnits.DAYS |
  TimeUnits.WEEKS | TimeUnits.MONTHS | TimeUnits.YEARS;

export type recipePopularity = 1 | 2 | 3 | 4 | 5;

export default interface IRecipe {
  key?: string,
  createdOn: string, 
  editedOn?: string,
  deletedOn?: string,
  name: string,
  scope: recipeScope,
  tags: recipeTags,
  ingredients: IIngredient[]
  duration: {
    number: number,
    timeUnit: timeUnit
  }
  steps: ICookingStep[]
  popularity: recipePopularity
}