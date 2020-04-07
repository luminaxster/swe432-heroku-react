import React from 'react';
import logo from './logo.svg';
import './App.css';
import Fetcher from './Fetcher';

function App() {
  return (
    <div className="App">
      <Fetcher url={'https://randomuser.me/api/'}/>
    </div>
  );
}

export default App;
