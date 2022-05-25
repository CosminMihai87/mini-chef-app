import { timeUnit } from './IRecipe';

export default interface ICookingStep {
  do: string,
  duration: {
    number: number
    unit: timeUnit
  }
}