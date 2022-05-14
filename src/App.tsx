import { 
  FC
} from 'react';
import styles from './App.module.scss';
import Layout from './components/Layout';

const App: FC = () => {
  return (
    <div className={styles.app}>
      <Layout />
    </div>
  );
};

export default App;