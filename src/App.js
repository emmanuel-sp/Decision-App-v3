
import './styles/styles.css';
import './styles/fonts.css';
import React, { createContext, useContext, useState } from 'react';
import {Gemini, Reason} from './components/Gemini';
import { LoginButton, LoginComponent, RegisterComponent } from './components/auth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent/>}/>
        <Route path="/register" element={<RegisterComponent/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}
function MainScreen() {
  const allReasons = [];
  const [reasons, setReasons] = useState(Array(19).fill(<Reason reason=""/>));
  const initialReasons = [];
  for (let i = 0; i < 19; i++) {
    initialReasons.push(<Reason key={Math.random()* 10000} reason=""/>);
  }
  const handleSubmit = function(indicies, reasons) {
    const temp = [...initialReasons];
    for (let index of indicies) temp[index] = <Reason key={Math.random()* 10000} reason={reasons.pop()}/>
    setReasons(temp);
  } 
  return (
    <div className='noto-sans grid'>
      <LoginButton/>
      {reasons}
      <div className='fade-in main'>
        <h1 className="title">Decision App</h1>
        <Gemini handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <MainScreen/>
  )

}

