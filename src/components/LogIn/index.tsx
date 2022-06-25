import {
  FC
} from 'react';
import style from './LogIn.module.scss';

export interface ILogInProps {}

const LogIn: FC<ILogInProps> = (props) => {

  return (
    <div className={style['log-in']}>
      LogIn
    </div>
  );
};

export default LogIn;