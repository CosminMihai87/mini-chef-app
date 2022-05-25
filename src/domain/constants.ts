export enum RecipeScope {
  PRIVATE = 'Private',
  PUBLIC = 'Public'
}

export enum RecipeTags {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SNACK = 'Snack',
  DESERT = 'Desert',
  VEGETARIAN = 'Vegetarian',
  VEGAN = 'Vegan',
}

export enum IngredientMeasuringUnits {
  MILIGRAMS = 'miligrams',
  GRAMS = 'grams',
  KILOGRAMS = 'kiliograms',
  MILILITERS = 'mililiters',
  LITERS = 'liters',
  DROP = 'drop(~0.05mL)',
  SMIDGEN = 'smidgen(~0.11mL)',
  PINCH = 'smidgen(~0.23mL)',
  DASH = 'dash(~0.46mL)',
  SALTSPOON = 'saltspoon(~0.92mL)',
  COFEESPOON = 'saltspoon(~1.84mL)',
  FLUID_DRAM = 'fluid dram(~3.69mL)',
  TEASPOON = 'teaspoon(~4.92mL)',
  DESERTSPOON = 'desertspoon(~9.85mL)',
  TABLESPOON = 'tablespoon(~14.78mL)',
  FLUID_OUNCE = 'fluid ounce(~29.57mL)',
  WINEGLASS = 'wineglass(~59.14mL)',
  TEACUP = 'teacup(~118.29mL)',
  CUP = 'cup(~236.58mL)',
  PINT = 'pint(~473.17mL)',
  QUART = 'quart(~946.35mL)',
  POTTLE = 'pottle(~1892.71mL)',
  GALLON = 'gallon(~3785.41mL)'
}

export enum TimeUnits {
  MILISECONDS = 'miliseconds',
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years'
}