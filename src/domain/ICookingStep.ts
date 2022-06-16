import { timeUnit } from './IRecipe';

export default interface ICookingStep {
  description: string,
  duration: {
    number: number
    timeUnit: timeUnit
  }
}