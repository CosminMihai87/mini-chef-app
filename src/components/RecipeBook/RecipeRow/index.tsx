import {
  FC
} from 'react';
import styles from './RecipeRow.module.scss';
import { TimeUnits } from '../../../domain/constants';
import StarLogo from '../../../assets/images/star-logo.svg';

type timeUnit = TimeUnits.MILISECONDS | TimeUnits.SECONDS | TimeUnits.MINUTES | TimeUnits.HOURS | TimeUnits.DAYS |
  TimeUnits.WEEKS | TimeUnits.MONTHS | TimeUnits.YEARS;

type recipePopularity = 1 | 2 | 3 | 4 | 5;
  
export type IRecipeRowProps = {
  entryKey: string,
  name: string,
  duration: {
    number: number,
    timeUnit: timeUnit
  },
  popularity: recipePopularity,
  selected: boolean,
  setSelectedRecipeRow: any,
};

const RecipeRow: FC<IRecipeRowProps> = (props) => {
  const {
    entryKey,
    name,
    duration,
    popularity,
    selected,
    setSelectedRecipeRow
  } = props;
  const {
    number,
    timeUnit
  } = duration;

  return (
    <div 
      className={`
        ${styles['recipe-row']}
        ${selected ? styles.selected : ''}
      `}
      onClick={()=> setSelectedRecipeRow(entryKey)} 
    >
      <div className={styles.name}>
        <span>{name}</span>
      </div>
      <div className={styles['duration-popularity']}>
        <div className={styles.duration}>
          <div className={styles.number}>
            <span>{number}</span>
          </div>
          <div className={styles['time-unit']}>
            <span>{timeUnit}</span>
          </div>
        </div>
        <div className={`
          ${styles.popularity}
          ${selected ? styles.selected : ''}
        `}>
          {[...Array(popularity)].map((_elem, key) => 
            <StarLogo 
              height='25px'
              key={key}
              width='25px'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeRow;