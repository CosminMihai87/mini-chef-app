import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import styles from './PageContent.module.scss';
import FwButton from '../../../shared/templates/Button';
import axios from '../../../shared/axiosInstance';
import { firebaseConfig } from '../../../shared/constants';
import { Form, Table } from 'react-bootstrap';

interface Ingredient {
  name: string,
  category: string
}

type logEntryType = 'warning' | 'error' | 'info';

interface Log {
  time: string,
  type: logEntryType,
  text: string
}

const PageContent: React.FC = () => {

  const [ingredientsList, setIngredientsList] = useState<Ingredient[] | null>(null);
  const [nameToAdd, setNameToAdd] = useState<string>('');
  const [categoryToAdd, setCategoryToAdd] = useState<string>('');
  const [keyToDelete, setKeyToDelete] = useState<string>('');
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(()=> {
    getIngredientsList(logs, false);
  },[])

  const getIngredientsList = useCallback((logs: Log[], writeLog = true) => {
    const requestHeader = {
      headers: {
        'Auth': firebaseConfig.apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    axios(firebaseConfig.referenceURL)
      .get('/app-data/ingredients-list.json',
        requestHeader
      )
      .then(response => {
        setIngredientsList(response.data);
        if (response.data !== null) {
          writeLog && setLogs(updateLogs('info', `Fetched ${Object.keys(response.data).length} ingredients!`, logs));
        } else {
          writeLog && setLogs(updateLogs('warning', 'There are no ingredients in the database!', logs));
        }
      })
      .catch(error => {
        setLogs(updateLogs('error', error, logs));
      });
  }, []);

  const addIngredient = (ingredient: Ingredient, logs: Log[]) => {
    const requestHeader = {
      headers: {
        'Auth': firebaseConfig.apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    if (ingredient.name!=='' && ingredient.category!=='') {
      axios(firebaseConfig.referenceURL)
        .post('/app-data/ingredients-list.json',
          JSON.stringify(ingredient),
          requestHeader
        )
        .then(() => {
          setLogs(updateLogs('info', `Added the ${ingredient.name} ingredient in the ${ingredient.category} category`, logs));
          setNameToAdd('');
          setCategoryToAdd('');
          getIngredientsList(logs, false);
        })
        .catch(error => {
          setLogs(updateLogs('error', error, logs));
        });
    } else {
      setLogs(updateLogs('warning', 'Not a valid Ingredient, please fill in the fields!', logs ) as any);
    }
  };

  const removeIngredient = useCallback((key: string, list:Ingredient[] | null, logs: Log[]) => {
    const requestHeader = {
      headers: {
        'Auth': firebaseConfig.apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    if (validKey(key, list)) {
      axios(firebaseConfig.referenceURL)
        .delete(`/app-data/ingredients-list/${key}.json`,
          requestHeader
        )
        .then(() => {
          setLogs(updateLogs('info', `Removed the ingredient with the the ${key} key`, logs));
          setKeyToDelete('');
          getIngredientsList(logs, false);
        })
        .catch(error => {
          setLogs(updateLogs('error', error, logs));
        });
    } else {
      setLogs(updateLogs('warning', 'Key is null or not in list!', logs));
    }
  }, []);

  const validKey = (key: string, list: any) => {
    return list!==null && key.length !== 0 && Object.keys(list).indexOf(key) !== -1;
  };

  const updateLogs = (type: logEntryType, text: string, logs: Log[]) => {
    return [ 
      ...logs,
      {
        time: new Date().toString().slice(16,24),
        type: type, 
        text: text 
      }
    ];
  };
  
  return (
    <div className={styles['page-content']}>
      <div className={styles['crud-test']}>
        <FwButton
          animation='progress'
          onClick={() => getIngredientsList(logs)} 
          variant='primary'
        >
          <span>Get Ingredients</span>
        </FwButton>
        <div className={styles['add']}>
          <FwButton
            animation='progress'
            onClick={() => addIngredient({name: nameToAdd, category: categoryToAdd}, logs)} 
            variant='primary'
          >
            <span>Add ingredient</span>
          </FwButton> 
          <Form className={styles['form']}>
            <Form.Group className={styles['name']}>
              <Form.Control
                as='textarea' 
                name='name'
                onChange={(e) => setNameToAdd(e.target.value)}
                placeholder='Ingredient name'
                value={nameToAdd}
              />
            </Form.Group>
            <Form.Group className={styles['category']}>
              <Form.Control
                as='textarea' 
                name='category'
                onChange={(e) => setCategoryToAdd(e.target.value)}
                placeholder='Ingredient category'
                value={categoryToAdd}
              />
            </Form.Group>
          </Form>
        </div>
        <div className={styles['delete']}>
          <FwButton
            animation='progress'
            onClick={() => removeIngredient(keyToDelete, ingredientsList, logs)} 
            variant='secondary'
          >
            <span>Delete Ingredient</span>
          </FwButton>
          <Form className={styles['form']}>
            <Form.Group className={styles['name']}>
              <Form.Control
                as='textarea' 
                name='name'
                onChange={(e) => setKeyToDelete(e.target.value)}
                placeholder='Ingredient key'
                value={keyToDelete}
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <br/>
      <div className={styles['logs']}>
        {logs && logs.length>0 &&
          logs.map((k:Log) =>
            <span 
              className={styles[k.type]}
              key={logs.indexOf(k)}
            > 
              {k.time}: {k.text}
            </span>
          )
        }
      </div>
      <br/> 
      <Table 
        className={styles['table']}
      >
        <thead className={styles['thead']}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        { ingredientsList!==null && Object.keys(ingredientsList).length>0 ?
          <tbody className={styles['tbody']}>
            {Object.keys(ingredientsList).map((k:any) =>(
              <tr className={styles['tr']} key={k}>
                <td className={styles['td']}> {k} </td>
                <td className={styles['td']}> {ingredientsList[k].name} </td>
                <td className={styles['td']}> {ingredientsList[k].category} </td>
              </tr>
            ))}
          </tbody>: <></>} 
      </Table> 
    </div>
  );
};

export default PageContent;