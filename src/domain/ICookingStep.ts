import { timeUnit } from './IRecipe';

export default interface ICookingStep {
  do: string,
  timer: {
    number: number
    unit: timeUnit
  }
}