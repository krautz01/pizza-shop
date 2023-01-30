import React from 'react';
import './App.css';
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Card from './pages/Card';
import {Routes,Route} from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        < Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/card' element={<Card/>}/>
              <Route path='*' element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
