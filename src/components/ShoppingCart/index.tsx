import {
  FC
} from 'react';
import styles from './ShoppingCart.module.scss';

export interface IShoppingCartProps {
  test?: string
}

const ShoppingCart: FC<IShoppingCartProps> = (props) => {

  return (
    <div className={styles['shopping-cart']}>
      <h1>ShoppingCart</h1>
    </div>
  );
};

export default ShoppingCart;