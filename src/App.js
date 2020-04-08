import React from 'react';
import './App.css';
import Fetcher from './Fetcher';
import Hooks, {aFunc} from './Hooks';

function App() {
  return (
    <div className="App">
      <Hooks name={aFunc().name}/>
      <Fetcher url={'https://randomuser.me/api/'}/>
    </div>
  );
}

export default App;
