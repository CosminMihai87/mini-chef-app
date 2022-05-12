import {
  useState,
  useEffect
} from 'react';

const DummyComponent = () => {
  const [APIData, setAPIData] = useState([]);

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(json => setAPIData(json.splice(1,10)));
  },[]);

  useEffect(()=>{
    console.log(APIData);
  },[APIData]);

  return (
    <div style={{color: '#ff7535'}}>
      {/* <ul>List</ul> */}
      {APIData.map((k:any) =>(
        <li key={k.id}>{k.title}</li>
      ))}
    </div>
  );
};

export default DummyComponent;