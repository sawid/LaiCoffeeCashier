import React from "react"
import logo from './logo.svg';
import './App.scss';
import Main from './components/pages/main/Main';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Routes, Route } from 'react-router-dom';
import Cashier from './components/pages/cashier/Cashier';

const DefaultContainer = () => {
  return (
  <React.Fragment>
    <Main />
    <Routes>
      <Route path="/" element={ <Cashier/> }/>
    </Routes>
  </React.Fragment>
  )
}

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/cashier" element={ <Cashier/> }/>
          <Route path="*" element={ <DefaultContainer/> }/>
        </Routes>
    </div>
  );
}

export default App;
