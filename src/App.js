import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import MainOne from './View/Main/index';
import { BackTop } from 'antd';

function App() {
  return (
    <div className="App">
       <MainOne/>
       <BackTop />
    </div>
  );
}

export default App;
