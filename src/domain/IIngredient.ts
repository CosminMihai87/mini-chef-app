import { IngredientMeasuringUnits } from '../domain/constants';

export interface IIngredient {
  [key: string]: {
    name: string,
    category: string
    measuringUnit: IngredientMeasuringUnits
  }
}

// export interface IIngredientList extends IIngredient {
//   [key: string]: {  
//     quantity: number,
//     canBeReplacedBy: IIngredient
//   }
// }