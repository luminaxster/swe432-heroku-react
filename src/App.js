import React from 'react';
import logo from './logo.svg';
import './App.css';
import Fetcher from './Fetcher';

function App() {
  return (
    <div className="App">
      <Fetcherurl={'https://randomuser.me/api/'}/>
    </div>
  );
}

export default App;
