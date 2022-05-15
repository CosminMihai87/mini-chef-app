import ReactDOM from 'react-dom/client';
import './index.module.scss';
import { 
  BrowserRouter,
  Routes, 
  Route,
  Navigate
} from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import Fridge from './components/Fridge';
import RecipeBook from './components/RecipeBook';
import Recipe from './components/Recipe';
import Ingredients from './components/Ingredients';
import WeeklyPlan from './components/WeeklyPlan';
import ShoppingCart from './components/ShoppingCart';
import Calendar from './components/Calendar';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
<BrowserRouter basename='mini-chef-app'>
    <Routes>
      <Route element={<App />} path='/'>
        <Route element={<Home />} index />
        <Route element={<Home />} path='/home' />
        <Route element={<RecipeBook />} path='/recipe-book' />
        <Route element={<Recipe />} path='/recipe' />
        <Route element={<Ingredients />} path='/ingredients' />
        <Route element={<WeeklyPlan />} path='/weekly-plan' />
        <Route element={<ShoppingCart />} path='/shopping-card' />
        <Route element={<Calendar />} path='/calendar' />
        <Route element={<Fridge />} path='/fridge' />
        <Route element={<Navigate to='/home'/>} path='/redirect' />
      </Route>
    </Routes>
  </BrowserRouter>
);