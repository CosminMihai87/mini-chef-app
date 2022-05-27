import { IngredientMeasuringUnits } from '../domain/constants';

export interface IIngredient {
  key: string,
  name: string,
  category: string,
  quantity: IIngredientQuantity,
  canBeReplacedBy: IIngredient
}

export interface IIngredientQuantity {
  number: number,
  measuringUnit: IngredientMeasuringUnits
}