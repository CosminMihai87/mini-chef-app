import {
  FC,
  ReactNode
} from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './PageContent.module.scss';
import LandingPage from '../../LandingPage';
import RecipeBook from '../../RecipeBook';
import Recipe from '../../Recipe';
import Ingredients from '../../Ingredients';
import WeeklyPlan from '../../WeeklyPlan';
import ShoppingCart from '../../ShoppingCart';
import Calendar from '../../Calendar';
import Fridge from '../../Fridge';

const PageContent: FC = () => {
  return (
    <div className={styles['page-content']}> 
      <Routes>
        <Route element={<LandingPage /> as ReactNode} path='/home' />
        <Route element={<RecipeBook /> as ReactNode} path='/recipe-book' />
        <Route element={<Recipe /> as ReactNode} path='/recipe-book/:recipeId' />
        <Route element={<Ingredients /> as ReactNode} path='/ingredients' />
        <Route element={<WeeklyPlan /> as ReactNode} path='/weekly-plan' />
        <Route element={<ShoppingCart /> as ReactNode} path='/shopping-cart' />
        <Route element={<Calendar /> as ReactNode} path='/calendar' />
        <Route element={<Fridge /> as ReactNode} path='/fridge' /> 
      </Routes>
    </div> 
  );
};

export default PageContent;