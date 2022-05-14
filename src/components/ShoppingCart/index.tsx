import {
  FC
} from 'react';
import styles from './ShoppingCart.module.scss';

export interface IShoppingCartProps {}

const ShoppingCart: FC<IShoppingCartProps> = (props) => {

  return (
    <div className={styles['shopping-cart']}>
      ShoppingCart
    </div>
  );
};

export default ShoppingCart;